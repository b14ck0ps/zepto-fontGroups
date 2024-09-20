<?php
require_once '../../config/Config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists(Config::GROUP_FILE)) {
        $groups = json_decode(file_get_contents(Config::GROUP_FILE), true);
        echo json_encode(['success' => true, 'groups' => $groups]);
    } else {
        echo json_encode(['success' => true, 'groups' => []]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Only GET method is allowed.']);
}
