DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCEMENT PRIMARY KEY,
    department_name VARCHAR(30) 
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCEMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT ,
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCEMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT FOREIGN KEY REFERENCES role(id),
    manager_id INT FOREIGN KEY REFERENCES employee(id)

);
