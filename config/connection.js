const mysql =require('mysql2');
const util = require ('util');

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"password",
    database: "employee_db"

});


connection.connection((err) => {
    if(err){
        throw err;
    }
});

connection.query = util.promisify(connection.query);

module.exports = connection;