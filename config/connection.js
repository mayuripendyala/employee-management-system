const mysql =require('mysql2');
const util = require ('util');

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"AppleEyes88",
    database: "employee_db"

});


connection.connect((err) => {
    if(err){
        throw err;
    }
});

connection.query = util.promisify(connection.query);

module.exports = connection;