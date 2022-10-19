const mysql = require('mysql');
const inquirer = require('inquirer');
const Employee = require('./constructors/employee')
const Role = require('./constructors/role');

var connection = mysql.createConnection({
    host: "localhost",

    //port 

    port: 3306,

    //username

    user: "root",

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
    
    function addEmployee(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the first name of the employee you would like to add?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the last name of the employee you would like to add?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the role of the employee you would like to add?",
                name: "role"
            },
            {
                type: "input",
                message: "Who is the manager of the employee you would like to add?",
                name: "manager"
            }
        ]).then(function(res){
            let firstName = res.firstName;
            let lastName = res.lastName;
            var role_id;
            var manager_id;
            let role = res.role;
            let manager = res.manager;
            convertNameId();
            function convertNameId(){
                connection.query("SELECT id, title from role", (err, data)=>{
                    if(err) throw err;
                    for(let i = 0; i<data.lenght;i++){
                        if(role===data[i].title){
                            role_id = data[i].id;
                        }
                    }
                    connection.query("SELECT id, first_name FROM employee", (err, data)=>{
                        if(err) throw err;
                        for(let i = 0; i<data.lenght;i++){
                            if(manager===data[i].firstName){
                                manager_id = data[i].id;
                            }
                        }
                        var newEmployee = new Employee(firstName, lastName, role_id, manager_id);
                        console.log(newEmployee);
                        connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)", [newEmployee.firstName,newEmployee.lastName,newEmployee.role_id,newEmployee.manager_id ], function (err, data) {
                            if (err) throw err;
                            console.log(`added ${newEmployee.firstName} to employee database`);
                        })
                    })
                    init();
                })
            }
        })
    }

 function addDepartment(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department you would like to add?",
                name: "name"
            }
        ]).then(function(res){
            //console log 
            connection.query("INSERT INTO department (name) VALUES (?)",[res.name],function(err, data) {
                if (err) throw err;
                console.log(`added $(res.name) to department database`);
            })
        })
    }

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you would like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department of this role?",
            name: "department"
        }
    ]).then(function(res){
        let title = res.title;
        let salary = res.salary;
        let department = res.department;
        let department_id;
        convertDepartmentId();
        function convertDepartmentId(){
            connection.query("SELECT id,name FROM department",(err, data)=>{
                if (err) throw err;
                for(let i = 0;i<data.lenght;i++){
                    if(department===data[i].name){
                        department_id = data[i].id;
                    }
                }
                var newRole = new Role(title,salary,department_id);
                console.log(newRole);
                connection.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?)" [newRole.title,newRole.salary,newRole.department_id], function (err, data){
                    if (err) throw err;
                    console.log(`added ${newRole.title} to role database`);
                })
                init();
            })
        }
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the role you would like to assign this employee",
            name: "role"
        },
        {
            type: "input",
            message: "What role would you like to assign this employee?",
            name: "role"
        }
    ]).then(function(res){
        let name = res.name;
        let role = res.role;
        let role_id;
        //check name match
        connection.query("SELECT id,title FROM role",(err, data)=>{
            if (err) throw err;
            for(let i = 0;i<data.lenght;i++){
                if(role===data[i].title){
                role_id = data[i].id;
                }
            }
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [role_id,name], function (err, data){
                if(err) throw err;
                console.log("Employee Role Updated")
            })
            init();
        })
    })
}