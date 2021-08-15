const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const first = require('../server');



function addEmployee(){
    var roleChoices = [];
    //selects all departments, pushes the id and name for each into the array
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleChoices.push(data[i].id + " - " + data[i].title)
        }
    })

    var managerChoices = [];
    //selects all departments, pushes the id and name for each into the array
    connection.query("SELECT distinct id, CONCAT(e.first_name, ' ',e.last_name) as name FROM employee e", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            managerChoices.push(data[i].id + " - " + data[i].name)
        }
    })

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
                    choices: roleChoices
                },
                {
                    name: "addEmployeeManager",
                    type: "list",
                    message : "Who is the manager for the employee?",
                    choices: managerChoices
                },
                ]).then((answer) => {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: answer.addEmployeeFirstName,
                            last_name: answer.addEmployeeLastName,
                            role_id: answer.addEmployeeRole[0],
                            manager_id: answer.addEmployeeManager[0]
                        },
                        function(err,result) {
                            if(err) throw err;
                            console.log(`Added ${answer.addEmployeeFirstName}${answer.addEmployeeLastName}${answer.addEmployeeManager[1]}  to the database!`);
                            first.start();
                        }
                    )

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

   var deptChoices = [];
    //selects all departments, pushes the id and name for each into the array
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            deptChoices.push(data[i].id + " - " + data[i].department_name)
        }
    })
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
                    name:"addDepart",
                    type: "list",
                    choices: deptChoices,
                    message:"What department does the role belong to?",
                }
            ]).then((answer) => {
                connection.query(
                    `INSERT INTO role SET ?`,
                    {
                        title: answer.addRoleName,
                        salary: answer.addSalary,
                        //sets dept equal to the first index of the string chosen from our array 'deptChoices
                        //since the array is created as "dept_id + ..." this will always be our id
                        department_id: answer.addDepart[0]
                    },
                    function(err,result) {
                        if(err) throw err;
                        console.log(`Added ${answer.addRoleName} to the database!`);
                        first.start();
                    }
                )
  
        }
    )
}

module.exports = { addRole, addEmployee, addDepartment}