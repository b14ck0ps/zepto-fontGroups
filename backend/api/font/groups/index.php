<?php
require_once '../../../config/Config.php';
require_once '../../../controllers/FontsGroupController.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$fontsGroupController = new FontsGroupController();

// Map request methods to controller actions
switch ($requestMethod) {
    case 'GET':
        $fontsGroupController->getGroups();
        break;
    case 'POST':
        $fontsGroupController->createGroup();
        break;
    case 'PUT':
        $fontsGroupController->editGroup();
        break;
    case 'DELETE':
        $fontsGroupController->deleteGroup();
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
