INSERT INTO department (department_name) values('Engineering');
INSERT INTO department (department_name) values('Finance');
INSERT INTO department (department_name) values('Sales');
INSERT INTO department (department_name) values('Legal');

INSERT INTO role(title, department_id, salary) values('Sales Lead', 3, 100000);
INSERT INTO role(title, department_id, salary)  values('Salesperson', 3, 80000);
INSERT INTO role(title, department_id, salary)  values('Lead Engineer', 1, 150000);
INSERT INTO role(title, department_id, salary)  values('Software Engineer', 1, 120000);
INSERT INTO role(title, department_id, salary)  values('Account Manager', 2, 160000);
INSERT INTO role(title, department_id, salary)  values('Accountant', 2, 125000);
INSERT INTO role(title, department_id, salary)  values('Leagal Team Lead', 4, 250000);
INSERT INTO role(title, department_id, salary)  values('Lawyer', 4, 190000);


INSERT INTO employee(first_name, last_name, role_id) values('John', 'Doe', 1);
INSERT INTO employee(first_name, last_name, role_id) values('Ashley', 'Rodriguez', 3);
INSERT INTO employee(first_name, last_name, role_id) values('Kunal', 'Singh', 5);
INSERT INTO employee(first_name, last_name, role_id) values('Sarah', 'Lourd', 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Mike','Chan',2,1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Kevin', 'Tupik', 4,3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Malia','Brown',6,5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Tom','Allen',8,7);
