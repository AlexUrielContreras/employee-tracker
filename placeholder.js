const cTable = require('console.table');
const db = require('./db/connections');
const inquirer = require('inquirer');

module.exports = class Tracker {
    constructor(option) {
        this.option = option
    }

    getAllDept() {
        const sql = 'SELECT * FROM department'
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.table(row)
        })
    }
    getAllRoles() {
        const sql = 'Select * FROM role'
        db.query(sql, (err, row) => {
            if (err) throw err
            console.table(row)
        })
    }
    getAllEmployees() {
        const sql = 'SELECT * FROM employee';
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.table(row)
        })
    }
    addDept() {
        inquirer.prompt([
            {
                name: 'addDept',
                type: 'input',
                message: 'Name of Department: '
            }
        ]).then(({ addDept }) => {
            const sql = "INSERT INTO department (name) VALUES (?)"
            const param = addDept;
            db.query(sql, param, (err, result) => {
                if (err) throw err;
                console.log(`Added ${addDept} to the Database`);
            })
        })
    }
}

