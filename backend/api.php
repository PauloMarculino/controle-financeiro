<?php
// backend/api.php

require_once 'config.php';
require_once 'database.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');

$action = $_GET['action'] ?? null;
$input = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    // Ações de Transações (sem alteração)
    case 'get_transactions':
        try {
            $conn = getDbConnection();
            $stmt = $conn->prepare("SELECT * FROM transactions ORDER BY date DESC");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(Exception $e) { http_response_code(500); echo json_encode(['error' => $e->getMessage()]); }
        break;
    case 'add_transaction':
        try {
            $conn = getDbConnection();
            $sql = "INSERT INTO transactions (description, value, type, categoryId, date, status) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$input['description'], $input['value'], $input['type'], $input['categoryId'], $input['date'], $input['status']]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
        } catch(Exception $e) { http_response_code(500); echo json_encode(['error' => $e->getMessage()]); }
        break;
    case 'update_transaction':
        try {
            $conn = getDbConnection();
            $sql = "UPDATE transactions SET description = ?, value = ?, type = ?, categoryId = ?, date = ?, status = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$input['description'], $input['value'], $input['type'], $input['categoryId'], $input['date'], $input['status'], $input['id']]);
            echo json_encode(['success' => true]);
        } catch(Exception $e) { http_response_code(500); echo json_encode(['error' => $e->getMessage()]); }
        break;
    case 'delete_transaction':
         try {
            $conn = getDbConnection();
            $sql = "DELETE FROM transactions WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$input['id']]);
            echo json_encode(['success' => true]);
        } catch(Exception $e) { http_response_code(500); echo json_encode(['error' => $e->getMessage()]); }
        break;

    // ▼▼▼ NOVAS AÇÕES PARA CATEGORIAS ▼▼▼
    case 'get_categories':
        try {
            $conn = getDbConnection();
            $stmt = $conn->prepare("SELECT * FROM categories ORDER BY type, name ASC");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'add_category':
        try {
            $conn = getDbConnection();
            $sql = "INSERT INTO categories (name, type) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$input['name'], $input['type']]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'delete_category':
        try {
            $conn = getDbConnection();
            $sql = "DELETE FROM categories WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$input['id']]);
            echo json_encode(['success' => true]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
    
    // Ação da IA (sem alteração)
    case 'proxy_ai':
        // ... (código do proxy da IA)
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Ação não encontrada.']);
        break;
}

?>