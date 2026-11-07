CREATE DATABASE mihnati_db;
USE mihnati_db;

-- جدول المستخدمين
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- جدول الوظائف
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- إدخال بيانات تجريبية للوظائف
INSERT INTO jobs (title, company, location, type) VALUES
('مطور واجهات أمامية', 'شركة التقنية الحديثة', 'الرياض', 'دوام كامل'),
('مصمم جرافيك', 'استوديو الإبداع', 'جدة', 'دوام جزئي'),
('محاسب مالي', 'مجموعة الأعمال', 'الخرطوم', 'دوام كامل'),
('مسؤول تسويق', 'منصة نمو', 'عن بُعد', 'عمل حر');