#create database bamazon;

USE bamazon;

CREATE table products(
ID INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price INT,
stock INT,
PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ('wireless moouse', 'electronics', 10, 200);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('silly putty', 'kids', 4, 50);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('paper towels', 'kitchen', 15, 100);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('bluetooth speakers', 'electronics', 20, 40);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('aloe vera gel', 'skin', 9, 15);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('sunscreen spf-50', 'skin', 7, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('toy gun', 'kids', 12, 90);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('french press', 'kitchen', 25, 100);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('wireless keyboard', 'electronics', 20, 150);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('samurai sword', 'antiques', 500, 50);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('gold vase', 'antiques', 600, 40);

UPDATE products
SET product_name = 'wireless mouse'
WHERE ID = 1;
