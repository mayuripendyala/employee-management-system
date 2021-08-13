const inquirer = require('inquirer');
const connection = require('../config/connection');
const first = require('../server');
const cTable =require('console.table');

function  updateEmployeeRole() {
    connection.query(
        `SELECT (e.first_name || ' ' || e.last_name) as name, e.id AS employee_id, r.role_title, r.id AS role_id, d.department_name
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY r.id`,
        function(err,res) {
            if(err) throw err;
            console.table(res);
           inquirer
            .prompt([{
                name: "updateEmployee",
                type: "list",
                choices: function() {
                    var employArr = [];
                    for(var i=0; i < res.length; i++) {
                        employArr.push(res[i].name);
                    }
                    return employArr;
                },
                message: "Which employee's role do you want to update?"
            },
            {
                name: "updateRole",
                type: "list",
                choices: function() {
                    var employRole = [];
                    for(var i=0; i < res.length; i++) {
                        employRole.push(res[i].role_id);
                    }
                    let removeRoleDups = new Set(employRole);
                    let newRoleArr = [...removeRoleDups];
                    return newRoleArr;
                },
                message: "Which employee's role do you want to update?"
            }
        ]).then((answer) => {
            connection.query(
                `UPDATE employee SET ?`,
                function(err,results) {
                    if(err) throw err;
                    console.log(`Updated employee's role`);
                    first.start();
                } 
            )
        })
        } 
    )


}
module.exports = {updateEmployeeRole}