DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary INT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
values("Sales");
INSERT INTO department(name)
values("Engineering");
INSERT INTO department(name)
values("Marketing");
INSERT INTO department(name)
values("Management");

INSERT INTO employee (first_name,last_name,role_id,manager_id)
values("Glen","Sturgis",1,3);
INSERT INTO employee (first_name,last_name,role_id,manager_id)
values("Garret","McNeil",2,4);
INSERT INTO employee (first_name,last_name,role_id,manager_id)
values("Jonah","Simms",4);

INSERT INTO role (title,salary,department_id)
values("Jr Developer",60000,2);
INSERT INTO role (title,salary,department_id)
values("Sr Developer",110000,2);
INSERT INTO role (title,salary,department_id)
values("Sales Assistant",42000,1);
INSERT INTO role (title,salary,department_id)
values("Email Marketing Specialist",86000,3);
INSERT INTO role (title,salary,department_id)
values("Content Marketing Creator",67000,3);
INSERT INTO role (title,salary,department_id)
values("Sr Marketing Manager",200000,2);


