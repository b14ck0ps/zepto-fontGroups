<?php
require_once '../../config/Config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fonts = array_filter(scandir(Config::UPLOAD_DIR), function ($file) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'ttf';
    });

    echo json_encode(['success' => true, 'fonts' => array_values($fonts)]);
} else {
    echo json_encode(['success' => false, 'message' => 'Only GET method is allowed.']);
}
