const inquirer = require('inquirer');
const Tracker = require('./placeholder')

const questions = () => {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'opening',
            message: 'What would you like to do?',
            choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an Employee', 'Update an Employee role']
        }
        ]).then(({ opening }) => {
            return opening
            
        })
}



function init() {
    questions()
        .then(({openPrmpt}) => {
            console.log(openPrmpt)
        })
    }

init();