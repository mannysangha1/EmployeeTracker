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
        if(answers.userChoice==="View All Employees"){
            // Get Request to return all employess
            viewEmployees();

        }
        if(answers.userChoice==="View All Departments"){
            // View All departments
            viewDepartments();
        }
        if(answers.userChoice==="View All Roles"){
            // View All Roles
            viewRoles();
        }
        if(answers.userChoice==="Add Employee"){
            // Add employee 
            addEmployee();
        }
        if(answers.userChoice==="Add a Department"){
            // Add or change Department
            addDepartment();
        }
        if(answers.userChoice==="Add a Role"){
            // Add or change role
            addRole();
        }
        if(answers.userChoice==="Update Employee Role"){
            // Update employee role
            updateEmployeeRole();
        }
        if(answers.userChoice==="Quit"){
            // QUIT
            process.exit()
        }
    })
}

    function viewEmployees(){
        connection.query("SELECT * FROM employee", (err, data)=>{
            if(err) throw err;
            console.table(data);
            init()
        })
}

    function viewDepartments(){
        connection.query("SELECT * FROM department", (err, data)=>{
            if(err) throw err;
            console.table(data);
            init()
        })
}

    function viewRoles(){
        connection.query("SELECT * FROM role", (err, data)=>{
            if(err) throw err;
            console.table(data);
            init()
        })
}