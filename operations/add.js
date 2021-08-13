const inquirer = require('inquirer');
const connection = require('../config/connection');
const first = require('../server');


function addEmployee(){
    connection.query(
        `SELECT e.first_name, e.last_name, e.id AS employee_id, r.id AS role_id, r.role_title, d.department_name
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY e.id`,
        function (err, res) {
            console.table(res);
            inquirer
                .prompt([{
                    name: "addEmployeeFirstName",
                    type: "input",
                    message : "What is the first name of the Employee?",
                },
                {
                    name: "addEmployeeLastName",
                    type:"input",
                    message: "What is the last name of the Employee?",
                },
                {
                    name: "addEmployeeRole",
                    type: "list",
                    message : "What is the employee role?",
                    choices: function(){
                        var roleArray =[];
                        for(var i=0;i < res.length; i++) {
                            roleArray.push(res[i].role_id);
                        }
                        let removeDups = new Set[roleArray];
                        let newRoleArr = [...removeDups];
                        return newRoleArr;
                    },
                },
                ]).then((answer) => {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: answer.addEmployeeFirstName,
                            last_name: answer.addEmployeeLastName,
                            role_id: answer.addEmployeeRole,
                        },
                        function(err,result) {
                            if(err) throw err;
                            console.log(`Added ${answer.addEmployeeFirstName}${answer.addEmployeeLastName} to the database!`);
                            first.start();
                        }
                    )

                })
            });
}

function addDepartment() {
    inquirer
        .prompt({
            name:"addDepartmentName",
            type: "input",
            message: "What is the name of the department?",     
        }).then((answer)=>{
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.addDepartmentName
                },
                function(err,results) {
                    if(err) throw err;
                    console.log(`Added ${answer.addDepartmentName} to the database`);
                    first.start();
                }

            )
        })
}

function addRole() {
    connection.query(`SELECT * FROM department`,
        function(err, res) {
            if( err) throw err;
            console.table(res);
            inquirer
                .prompt([{
                    name:"addRoleName",
                    type:"input",
                    message:"What is the name of the role?",

                },
                {
                    name: "addSalary",
                    type: "input",
                    message: "What is the salary?",
                    validate: function(value) {
                        if(isNaN(value) === false) {
                            return true;
                        }
                            return false;
                    }
                },
                {
                    name:"addDepartment",
                    type: "list",
                    choices: function() {
                        var departArray = [];
                        for (var i=0; i< res.length ;i ++){
                            departArray.push(res[i].id);
                        }
                        return departArray;
                        
                    },
                    message:"What department does the role belong to?",
                }
            ]).then((answer) => {
                connection.query(
                    `INSERT INTO role SET ?`,
                    {
                        role_title: answer.addRoleName,
                        salary: answer.addSalary,
                        department_id: answer.addDepartment
                    },
                    function(err,result) {
                        if(err) throw err;
                        console.log(`Added ${answer.addRoleName} to the database!`);
                        first.start();
                    }
                )
            })
        }
    )
}

module.exports = { addRole, addEmployee, addDepartment}