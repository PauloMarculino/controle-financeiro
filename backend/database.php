<?php
// backend/database.php

require_once 'config.php';

function getDbConnection() {
    try {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        // Configura o PDO para lançar exceções em caso de erro
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        // Em um ambiente de produção, você não "daria echo" no erro, mas para depuração isso é útil.
        http_response_code(500);
        echo json_encode(['error' => "Erro de conexão: " . $e->getMessage()]);
        exit;
    }
}
?>