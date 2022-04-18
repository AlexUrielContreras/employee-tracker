const cTable = require('console.table');
const db = require('./db/connections');

module.exports = class Tracker {
    constructor(option) {
        this.option = this.option
    }

    getAllDept() {
        const sql = 'SELECT * FROM department'
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.table(row)
        })
    }
}

