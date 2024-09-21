<?php

class FontsGroupController
{
    // Handle GET request
    public function getGroups()
    {
        if (file_exists(Config::GROUP_FILE)) {
            $groups = json_decode(file_get_contents(Config::GROUP_FILE), true);
            echo json_encode(['success' => true, 'groups' => $groups]);
        } else {
            echo json_encode(['success' => true, 'groups' => []]);
        }
    }

    // Handle POST request
    public function createGroup()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['name']) || count($input['fonts']) < 2) {
            echo json_encode(['success' => false, 'message' => 'A group must have a name and at least two fonts.']);
            exit;
        }

        foreach ($input['fonts'] as $font) {
            if (!isset($font['fontName']) || !isset($font['font']) || !isset($font['size']) || !isset($font['price'])) {
                echo json_encode(['success' => false, 'message' => 'Each font entry must include fontName, font, size, and price.']);
                exit;
            }
        }

        $groups = file_exists(Config::GROUP_FILE) ? json_decode(file_get_contents(Config::GROUP_FILE), true) : [];
        $groups[] = ['name' => $input['name'], 'fonts' => $input['fonts']];

        file_put_contents(Config::GROUP_FILE, json_encode($groups, JSON_PRETTY_PRINT));

        echo json_encode(['success' => true, 'message' => 'Font group created successfully!']);
    }

    // Handle PUT request
    public function editGroup()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['name']) || count($input['fonts']) < 2) {
            echo json_encode(['success' => false, 'message' => 'A group must have a name and at least two fonts.']);
            exit;
        }

        foreach ($input['fonts'] as $font) {
            if (!isset($font['fontName']) || !isset($font['font']) || !isset($font['size']) || !isset($font['price'])) {
                echo json_encode(['success' => false, 'message' => 'Each font entry must include fontName, font, size, and price.']);
                exit;
            }
        }

        if (file_exists(Config::GROUP_FILE)) {
            $groups = json_decode(file_get_contents(Config::GROUP_FILE), true);
            foreach ($groups as &$group) {
                if ($group['name'] === $input['oldName']) {
                    $group['name'] = $input['name'];
                    $group['fonts'] = $input['fonts'];
                    file_put_contents(Config::GROUP_FILE, json_encode($groups, JSON_PRETTY_PRINT));
                    echo json_encode(['success' => true, 'message' => 'Font group edited successfully!']);
                    return;
                }
            }
        }

        echo json_encode(['success' => false, 'message' => 'Font group not found.']);
    }

    // Handle DELETE request
    public function deleteGroup()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['name'])) {
            echo json_encode(['success' => false, 'message' => 'A group name is required for deletion.']);
            exit;
        }

        if (file_exists(Config::GROUP_FILE)) {
            $groups = json_decode(file_get_contents(Config::GROUP_FILE), true);
            foreach ($groups as $key => $group) {
                if ($group['name'] === $input['name']) {
                    unset($groups[$key]);
                    file_put_contents(Config::GROUP_FILE, json_encode(array_values($groups), JSON_PRETTY_PRINT));
                    echo json_encode(['success' => true, 'message' => 'Font group deleted successfully!']);
                    return;
                }
            }
        }

        echo json_encode(['success' => false, 'message' => 'Font group not found.']);
    }
}
