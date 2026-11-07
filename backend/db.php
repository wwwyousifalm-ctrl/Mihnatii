<?php
$host = 'sql305.infinityfree.com';
$dbname = 'if0_43261920_Mihnati';
$username = 'if0_43261920'; // اسم المستخدم الافتراضي في XAMPP
$password = 'RUT95v5strnCM'; // كلمة المرور الافتراضية فارغة

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
  // إعداد وضع الأخطاء لعرضها
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("فشل الاتصال بقاعدة البيانات: " . $e->getMessage());
}
