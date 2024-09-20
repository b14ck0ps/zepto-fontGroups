<?php
require_once '../../config/Config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['name']) || count($input['fonts']) < 2) {
        echo json_encode(['success' => false, 'message' => 'A group must have a name and at least two fonts.']);
        exit;
    }

    $groups = file_exists(Config::GROUP_FILE) ? json_decode(file_get_contents(Config::GROUP_FILE), true) : [];
    $groups[] = ['name' => $input['name'], 'fonts' => $input['fonts']];

    file_put_contents(Config::GROUP_FILE, json_encode($groups, JSON_PRETTY_PRINT));

    echo json_encode(['success' => true, 'message' => 'Font group created successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed.']);
}
