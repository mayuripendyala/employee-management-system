const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const first = require('../server');
const cTable =require('console.table');

function  updateEmployeeRole() {
    

    var  employeeChoices = [];
    connection.query("SELECT * FROM employee",  function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
          employeeChoices.push(data[i].id + " " + data[i].first_name + " " + data[i].last_name)
        }
        // console.table(data);
        
    });


    var  roleChoices = [];
    connection.query("SELECT * FROM role",  function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleChoices.push(data[i].id + "  " + data[i].title)
        }
        // console.table(data);
        
   
    // console.log(roleChoices,employeeChoices);
     inquirer
        .prompt([{
                name: "updateEmployee",
                type: "list",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            },
            {
                name: "updateRole",
                type: "list",
                message: "What role are you seeking to change it to?",
                choices: roleChoices
            }
        ])
        .then((answer) => {
            connection.query(
                `UPDATE employee SET ? WHERE id = ${answer.updateEmployee[0]}`,
                {
                    role_id: answer.updateRole[0],
                },
                function(err,results) {
                    if(err) throw err;
                    console.log(`Updated employee's role`);
                    first.start();
                } 
            )
       
        })
        .catch((error)=> {console.error();
    });
    });
}
module.exports = {updateEmployeeRole};