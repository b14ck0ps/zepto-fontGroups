<?php
require_once '../../config/Config.php';

require_once '../../utils/Validation.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['font']) && Validation::validateFontFile($_FILES['font'])) {
        $fileName = basename($_FILES['font']['name']);
        $targetPath = Config::UPLOAD_DIR . $fileName;

        if (!file_exists(Config::UPLOAD_DIR)) {
            mkdir(Config::UPLOAD_DIR, 0777, true);
        }
        if (move_uploaded_file($_FILES['font']['tmp_name'], $targetPath)) {
            echo json_encode(['success' => true, 'message' => 'Font uploaded successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload the font.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid font file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed.']);
}
