const inquirer = require('inquirer');
const db = require('./db/connections');
const Tracker = require('./placeholder');

function startingTable() {
    const sql = ' SELECT employee.id,employee.first_name, employee.last_name, employee.manager_id, role.title,role.salary FROM employee LEFT JOIN role ON role_id = role.id;   '
    db.query(sql,(err, row) => {
        if (err) throw err;
        console.table(row)
        questions()
    })
}

const questions = () => {   
     inquirer
        .prompt([
            {
                name: 'opening',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update an Employee role']
            }
        ]).then(({ opening }) => {
            const response = new Tracker(opening);
            console.log(opening);
        switch (response.option) {
            case 'View all Departments':
                response.getAllDept();
                break;
            case 'View all Roles':
                response.getAllRoles();
                break;
            case 'View all Employees':
                response.getAllEmployees();
                break;
            case 'Add Department':
                response.addDept();
                break;
            case 'Add Role':
                response.addRole();
                break;
            case 'Add Employee':
                response.addEmployee();
                break;
            default:
                response.updateEmployee();
                break;  
        }
        })
}





startingTable()

