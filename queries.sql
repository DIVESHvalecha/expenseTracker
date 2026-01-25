create database expense_tracker;
use expense_tracker;

create table users(
	user_id INT primary key AUTO_INCREMENT,
    name varchar(50) not null,
    username varchar(50) not null,
    password varchar(255) not null,
    email varchar(30) not null unique,
    phone_no varchar(10) not null,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active_yn int default 1
);


ALTER TABLE users
ADD UNIQUE (username);

create table categories(
	category_id INT primary key auto_increment,
	user_id INT not null,
    foreign key (user_id) references users(user_id) on delete cascade,
    name varchar(30) not null,
    description varchar(50),
    icon_url varchar(255) not null,
    
    type enum ('income' , 'expense') not null default 'expense',
    
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active_yn int default 1
);

create table transactions(
	transaction_id INT primary key auto_increment,
	category_id INT,
	user_id INT not null,
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (category_id) references categories(category_id) on delete set null,
    amount decimal(10,2),
    transaction_date DATE not null,
    notes varchar(50),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active_yn int default 1
);

create table auth_tokens(
	token VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    expiry TIMESTAMP,
    used_yn BOOLEAN DEFAULT FALSE,
    foreign key (user_id) references users(user_id) on delete cascade
);

select * from auth_tokens where token like "fc2bff6b-cc2d-4f39-bcd7-cb6260393459" AND used_yn = 0;

INSERT INTO users (name, username, password, email, phone_no)
VALUES
('Rahul Sharma', 'rahul_s', 'hashed_password_1', 'rahul@gmail.com', '9876543210'),
('Ananya Verma', 'ananya_v', 'hashed_password_2', 'ananya@gmail.com', '9123456780'),
('Amit Patel', 'amit_p', 'hashed_password_3', 'amit@gmail.com', '9988776655');


INSERT INTO categories (user_id, name, description, icon_url, type)
VALUES
-- Rahul's categories
(1, 'Salary', 'Monthly salary', 'https://icons.com/salary.png', 'income'),
(1, 'Food', 'Daily food expenses', 'https://icons.com/food.png', 'expense'),
(1, 'Transport', 'Travel expenses', 'https://icons.com/transport.png', 'expense'),

-- Ananya's categories
(2, 'Freelance', 'Freelance income', 'https://icons.com/freelance.png', 'income'),
(2, 'Shopping', 'Online shopping', 'https://icons.com/shopping.png', 'expense');


INSERT INTO transactions (category_id, user_id, amount, transaction_date, notes)
VALUES
-- Rahul transactions
(1, 1, 50000.00, '2025-01-01', 'January salary'),
(2, 1, 250.50, '2025-01-02', 'Lunch'),
(3, 1, 120.00, '2025-01-03', 'Bus ticket'),

-- Ananya transactions
(4, 2, 15000.00, '2025-01-05', 'Website project'),
(5, 2, 3200.75, '2025-01-06', 'Amazon shopping');

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM transactions;