DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("1", "Instant Pot", "Home & Kitchen", "79.95", "22");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("2", "Cast Iron Skillet", "Home & Kitchen", "14.95", "5");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("3", "Stovetop Espresso Maker", "Home & Kitchen", "24.95", "15");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4", "French Press Coffee Maker", "Home & Kitchen", "25.48", "10");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5", "Coffee Grinder", "Home & Kitchen", "229.99", "12");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6", "Serrated Utility Knife", "Home & Kitchen", "109.95", "8");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("7", "Fleece Dog Vest", "Pet Supplies", "8.45", "21");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("8", "Greenies Dog Treats", "Pet Supplies", "33.99", "8");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("9", "Dog Sweater", "Pet Supplies", "52.99", "5");
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("10", "Dog Bed", "Pet Supplies", "20.29", "3");
