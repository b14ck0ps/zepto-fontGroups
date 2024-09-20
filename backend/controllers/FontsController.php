<?php

class FontsController
{
    // Handle GET request
    public function getFonts()
    {
        $fonts = array_filter(scandir(Config::UPLOAD_DIR), function ($file) {
            return pathinfo($file, PATHINFO_EXTENSION) === 'ttf';
        });

        echo json_encode(['success' => true, 'fonts' => array_values($fonts)]);
    }

    // Handle POST request
    public function uploadFont()
    {
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
    }

    // Handle DELETE request
    public function deleteFont()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['fontName'])) {
            $targetPath = Config::UPLOAD_DIR . basename($input['fontName']);

            if (file_exists($targetPath)) {
                if (unlink($targetPath)) {
                    echo json_encode(['success' => true, 'message' => 'Font deleted successfully!']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete the font.']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Font not found.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Font name is required.']);
        }
    }
}
