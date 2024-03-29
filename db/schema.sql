DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) 
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT ,
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT ,
    role_id INT ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
ALTER TABLE employee
   ADD CONSTRAINT sr_fk_emp_man 
   FOREIGN KEY (manager_id)
   REFERENCES employee(id)
;