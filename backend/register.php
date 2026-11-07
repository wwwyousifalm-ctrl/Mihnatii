<?php
session_start();
require_once 'db.php';

// التحقق من أن الطلب قادم عبر POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // استقبال البيانات (سواء من form عادي أو من fetch/JSON)
  $data = json_decode(file_get_contents("php://input"), true);

  $name = $data['name'] ?? '';
  $email = $data['email'] ?? '';
  $password = $data['password'] ?? '';

  if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "جميع الحقول مطلوبة"]);
    exit;
  }

  // تشفير كلمة المرور (أمان عالي)
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword]);

    echo json_encode(["status" => "success", "message" => "تم إنشاء الحساب بنجاح"]);
  } catch (PDOException $e) {
    // خطأ في حال كان الإيميل مسجل مسبقاً
    echo json_encode(["status" => "error", "message" => "البريد الإلكتروني مسجل بالفعل"]);
  }
}
