-- =====================================================
-- Optima Staff Analytics
-- SQL schema for future server-side version
-- PostgreSQL / MySQL style starter structure
-- =====================================================

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL,
    city VARCHAR(120),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_code VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(180) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    role_title VARCHAR(150) NOT NULL,
    department_id INT,
    branch_id INT,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    status ENUM('Active', 'Remote', 'Vacation', 'Suspended') DEFAULT 'Active',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE attendance_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    work_date DATE NOT NULL,
    check_in TIME NULL,
    check_out TIME NULL,
    break_minutes INT DEFAULT 0,
    status ENUM('Present', 'Late', 'Remote', 'Absent', 'Sick', 'Vacation') NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'HR', 'Manager', 'Analyst') DEFAULT 'Admin',
    employee_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE INDEX idx_attendance_logs_work_date ON attendance_logs(work_date);
CREATE INDEX idx_attendance_logs_employee_id ON attendance_logs(employee_id);
CREATE INDEX idx_employees_department_id ON employees(department_id);
CREATE INDEX idx_employees_branch_id ON employees(branch_id);

-- =====================================================
-- DEMO DATA
-- =====================================================

INSERT INTO departments (name, description) VALUES
('Кредитный отдел', 'Работа с кредитными продуктами'),
('Риск-менеджмент', 'Анализ и управление рисками'),
('Операционный отдел', 'Обслуживание клиентских операций'),
('HR', 'Кадровое сопровождение'),
('Финансовый отдел', 'Финансовая аналитика и отчеты'),
('IT', 'Поддержка инфраструктуры'),
('Digital Banking', 'Цифровые банковские сервисы');

INSERT INTO branches (name, city, address) VALUES
('Бишкек — Головной офис', 'Бишкек', 'Проспект Чуй, пример адреса'),
('Ош — Центральный филиал', 'Ош', 'Центральная улица, пример адреса'),
('Каракол — Филиал', 'Каракол', 'Пример адреса 12'),
('Бишкек — Data Center', 'Бишкек', 'Техническая зона, пример адреса');

-- =====================================================
-- SAMPLE ANALYTICAL QUERIES
-- =====================================================

-- 1. Общее число сотрудников по отделам
SELECT d.name AS department_name, COUNT(e.id) AS employees_count
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.name
ORDER BY employees_count DESC;

-- 2. Общее число опозданий за месяц
SELECT DATE_FORMAT(work_date, '%Y-%m') AS month_name, COUNT(*) AS late_count
FROM attendance_logs
WHERE status = 'Late'
GROUP BY DATE_FORMAT(work_date, '%Y-%m')
ORDER BY month_name DESC;

-- 3. Среднее количество отработанных часов по сотрудникам
SELECT
    e.full_name,
    ROUND(AVG(
        TIMESTAMPDIFF(MINUTE,
            CONCAT(work_date, ' ', check_in),
            CONCAT(work_date, ' ', check_out)
        ) - break_minutes
    ) / 60, 2) AS avg_work_hours
FROM attendance_logs a
JOIN employees e ON e.id = a.employee_id
WHERE a.check_in IS NOT NULL
  AND a.check_out IS NOT NULL
GROUP BY e.full_name
ORDER BY avg_work_hours DESC;

-- 4. Посещаемость по филиалам
SELECT
    b.name AS branch_name,
    COUNT(a.id) AS total_logs,
    SUM(CASE WHEN a.status IN ('Present', 'Late', 'Remote') THEN 1 ELSE 0 END) AS attended_logs
FROM branches b
LEFT JOIN employees e ON e.branch_id = b.id
LEFT JOIN attendance_logs a ON a.employee_id = e.id
GROUP BY b.name
ORDER BY attended_logs DESC;
