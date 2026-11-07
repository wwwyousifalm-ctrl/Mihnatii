<?php
require_once 'db.php';

$stmt = $pdo->query("SELECT * FROM jobs");
$jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

// إرجاع البيانات بصيغة JSON ليفهمها الجافا سكريبت
header('Content-Type: application/json');
echo json_encode($jobs);
