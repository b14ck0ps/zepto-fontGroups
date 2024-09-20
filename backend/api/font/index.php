<?php
require_once '../../config/Config.php';
require_once '../../utils/Validation.php';
require_once '../../controllers/FontsController.php';

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$fontsController = new FontsController();

// Router for /api/fonts
switch ($requestMethod) {
    case 'GET':
        $fontsController->getFonts();
        break;
    case 'POST':
        $fontsController->uploadFont();
        break;
    case 'DELETE':
        $fontsController->deleteFont();
        break;
    case 'OPTIONS':
        http_response_code(200);
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method' . $requestMethod . ' not allowed']);
        break;
}
