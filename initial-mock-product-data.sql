#create database bamazon;

USE bamazon;

CREATE table products(
ID INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50),
price INT,
stock INT,
PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ('wireless mouse', 'electronics', 10, 29);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('wireless keyboard', 'electronics', 20, 105);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('paper towels', 'kitchen', 15, 3);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('bluetooth speakers', 'electronics', 20, 2);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('coleman tent', 'outdoor', 9, 15);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('vitamix', 'kitchen', 550, 51);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('french press', 'kitchen', 25, 100);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('silly putty', 'kids', 4, 50);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('camping cot', 'outdoor', 500, 38);

INSERT INTO products (product_name, department_name, price, stock)
VALUES('gold vase', 'antiques', 600, 4);

-- INSERT INTO products (product_name, department_name, price, stock)
-- VALUES ('bluetooth headphones', 'electronics', 10, 20);

-- INSERT INTO products (product_name, department_name, price, stock)
-- VALUES('whoopy cushion', 'kids', 8, 75);

-- INSERT INTO products (product_name, department_name, price, stock)
-- VALUES('kitchen knife', 'kitchen', 30, 165);


-- UPDATE products
-- SET stock = 4
-- WHERE ID = 11;
