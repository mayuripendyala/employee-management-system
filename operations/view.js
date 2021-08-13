const inquirer = require('inquirer');
const connection = require('../config/connection');
const first = require('../server');
const cTable =require('console.table');

function showAllEmployees() {
    connection.query(
        `SELECT  e.id AS Employee_ID, e.first_name AS First_Name, e.last_name AS Last_Name, r.salary AS Salary, r.role_title AS title, d.department_name AS department, (m.fist_name || ' ' || m.last_name) as manager
        FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
        INNER JOIN role r ON e.role_id = r.id 
        INNER JOIN department d ON r.department_id = d.id 
        ORDER BY e.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}

function showAllRoles() {
    connection.query(
        `SELECT r.id, r.title as title, d.department_name as department, r.salary as salary
        FROM role r INNER JOIN department d ON d.id =r.department_id
        ORDER BY r.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}


function showAllDepartments() {
    connection.query(
        `SELECT d.id, d.department_name as name
        FROM department d
        ORDER BY d.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}

module.exports ={ showAllDepartments, showAllRoles, showAllEmployees}