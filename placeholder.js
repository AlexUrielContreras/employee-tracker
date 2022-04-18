const cTable = require('console.table');
const db = require('./db/connections');

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
}

