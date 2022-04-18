const inquirer = require('inquirer');
const Tracker = require('./placeholder')


const questions = () => {
    
    return inquirer
        .prompt([
            {
            name: 'opening',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an Employee', 'Update an Employee role']
        }
        ]).then(({ opening }) => {
            const response = new Tracker(opening)
            switch (response.option) {
                case 'View all departments':
                    response.getAllDept();
                    break;
                case 'View all roles':
                    response.getAllRoles();
                    break;
                case 'View all employees':
                    response.getAllEmployees();
                    break;
                default:
                    console.log('pick again')
                    questions();
            } 
        })
}






questions();