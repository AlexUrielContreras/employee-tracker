const cTable = require('console.table');
const con = require('./db/connections');
const inquirer = require('inquirer');


module.exports = class Tracker {
    constructor(option) {
        this.option = option
    }
    getAllDept() {
        const sql = 'SELECT * FROM department'
        con.promise().query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log)
            .then(() => con.end());
    }

    getAllRoles() {
        const sql = 'Select role.*, department.name AS dept_name FROM role LEFT JOIN department ON role.department_id = department.id'
        con.promise().query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log)
            .then(() => con.end());
    }

    getAllEmployees() {
        const sql = 'SELECT id,first_name,last_name FROM employee';
        con.promise().query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log)
            .then(() => con.end());
    }

    addDept() {
        inquirer.prompt([
            {
                name: 'addDept',
                type: 'input',
                message: 'Name of Department:'
            }
        ]).then(({ addDept }) => {
            const sql = "INSERT INTO department (name) VALUES (?)"
            const param = addDept;
            con.promise().query(sql, param)
                .then(([rows, fields]) => {
                    console.log(`${addDept} has been added to the database`);
                })
                .catch(console.log)
                .then(() => con.end());
        })
    }

    addRole() {
        con.connect((err) => {
            if (err) throw err
            con.query(`SELECT id , name FROM department`,function(err, results, fields){
                if (err) throw err;
                const depName = []
                results.forEach(((name) => depName.push(name.name)))
                console.log(depName)
            
            inquirer.prompt([
                {
                    name: 'roleName',
                    message: 'What is the name of the role? '  
                },
                {
                    name: 'salary',
                    message: "What is the salary of the role? "
                },
                {
                    type: 'list',
                    name: 'belong',
                    message: 'Which department does the role belong to',
                    choices: depName
                }
            ]).then((answer) =>{
                let titleId;
                results.forEach((role)=> {
                    if (answer.belong === role.name) {
                        titleId = role.id
                        console.log(titleId)
                    }
                })
                const sql = 'INSERT INTO role (title,salary,department_id) VALUES (?,?,?)'
                
                con.promise().query(sql, [answer.roleName, answer.salary, titleId])
                .then(([rows, fields]) => {
                    console.log(`${answer.roleName} has been added to the database`)
                })
                .catch(console.log)
                .then(() => con.end());
            })
        })
        })
    }
    addEmployee(){
        con.connect((err) => {
            if (err) throw err;
            con.query('SELECT role.title, role.id, employee.first_name, employee.id FROM role LEFT JOIN employee ON role.id = employee.id',function(err, results, fields){
                if (err) throw err;
                console.log(results)
                let title = [];
                results.forEach(name => title.push(name.title))
                console.log(title)
                inquirer.prompt([
                    {
                        name: 'employName',
                        message: "What is the employee's first name? "
                    },
                    {
                        name: 'employLastName',
                        message: "What is the employee's last name? "
                    },
                    {
                        type: 'list',
                        name: 'employRole',
                        message: "What is the employee's role? ",
                        choices: title
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Whos is the employee's manager?",
                        choices: []
                    }
                ]).then(( answer )=>{
                    console.log(answer)
                    let roleId;
                    console.log(results)
                    results.forEach((title) => {
                        if (answer.employRole === title.title){
                            roleId = title.id
                            console.log(roleId)
                        }
                    })
                    
                })
            })
        })
    }

}       
    

/* 
updateEmployee() {  
        con.connect(function(err) {
            if (err) throw err;
            con.query('SELECT employee.id,employee.first_name,employee.last_name, role.id as "role_id" FROM employee, role, department WHERE department.id = role.department_id and role.id = employee.role_id', function(err, results ,fields) {
                if (err) throw err 
                const nameArr = []
                results.forEach(name => nameArr.push(`${name.first_name} ${name.last_name}`));
                console.log(nameArr) 
                con.connect(function(err) {
                    if (err) throw err
                con.query('SELECT role.id , role.title FROM role', function(err,results,fields) {
                    if (err) throw err
                   const roleTitle = [];
                   results.forEach(title => roleTitle.push(title.title))
                   console.log(roleTitle)
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'update',
                    message: 'Which employee role would you like to update? ',
                    choices: nameArr
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Choose new role',
                    choices: roleTitle
                }
            ]).then(( answer ) => {
               let newTitleId, employeeId;
                results.forEach((role)=> {
                    if (answer.newRole === role.title) {
                        newTitleId = role.id;
                    }
                });
                results.forEach((employee)=> {
                    if (answer.update === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id
                        console.log(employeeId)
                    }
                });
                const sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
                const params = [newTitleId, employeeId]
                con.promise().query(sql, params)
                .then(([rows, fields]) => {
                    console.log(`${answer.update} has been updated to ${answer.newRole}`)
                    console.table(fields)
                })
                .catch(console.log)
                .then(() => con.end());
                
            })
        })
    }   )
        }
        )}
    )}
*/