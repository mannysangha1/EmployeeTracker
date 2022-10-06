const mysql = require('mysql');
const inquirer = require('inquirer');
const Employee = require('./constructors/employee')
const Role = require('./constructors/role');
const ListPrompt = require('inquirer/lib/prompts/list');

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

connection.connect(function(err) {
    if (err) throw err; 
    console.log("connected as id " + connection.threadId);
});

init ();

function init() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["View all employees", "View all departments", "View all Roles", "Add Employee", "Add a Department", "Add a Role", "Update Employee Role", "Quit"],
        name: "userChoice" 
    }).then(function(answers){
        console.log(answers.userChoice);
        
    })
}