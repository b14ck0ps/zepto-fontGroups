<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$fontDir = '../../uploads/fonts/';

$filename = basename($_GET['file']);
$filePath = $fontDir . $filename;

if (file_exists($filePath)) {
    header('Content-Type: font/ttf');
    header('Content-Length: ' . filesize($filePath));
    header('Cache-Control: public, max-age=31536000');

    readfile($filePath);
    exit;
} else {
    http_response_code(404);
    echo 'Font file not found.';
}
