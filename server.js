const connection = require('./config/connection.js');
const add = require("./operations/add.js");
const view = require("./operations/view.js");
const update = require("./operations/update.js");


const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');


console.log(
    chalk.white.bgBlackBright(
        figlet.textSync('Employee Manager',{horizontalLayout:'full',verticalLayout :'full'})
    )
);


function start() {
    inquirer
        .prompt({
            name: "start",
            type:"list",
            message :"What would yoy like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        }).then((answer) => {
                if(answer.start === "View All Employees") {
                    view.showAllEmployees();
                }
                else if (answer.start === "Add Employee") {
                    add.addEmployee();
                }
                else if (answer.start === "Update Employee Role") {
                    update.updateEmployeeRole();
                }
                else if (answer.start === "View All Roles") {
                    view.showAllRoles();
                }
                else if (answer.start === "Add Role") {
                    add.addRole();
                }
                else if (answer.start === "View All Departments") {
                    view.showAllDepartments();
                }
                else if (answer.start === "Add Department") {
                    add.addDepartment();
                }
                else {
                    console.table("Goodbye!");
                    connection.end();
                }
        });



}

exports.start = start;
start();