const mysql = require('mysql');
const inquirer = require('inquirer');
const Employee = require('./constructors/employee')
const Role = require('./constructors/role')

var connection = mysql.createConnection({
    host: "localhost",

    //port 

    port: 3001,

    //username

    username: "root",

    //password
    password: "password",
    database: "employee_db"
});