const cTable = require('console.table');
const con = require('./db/connections');
const inquirer = require('inquirer');
const  questions  = require('./index')

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
        const sql = 'SELECT role.id,role.title,role.salary, department.name AS dept_name FROM role LEFT JOIN department ON role.department_id = department.id'
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
                let title = [];
                results.forEach(name => title.push(name.title));
                con.query('SELECT first_name, id FROM employee',function(err, result, fields){
                    if (err) throw err
                    let employArr = []
                    result.forEach((employName) => employArr.push(employName.first_name))
                inquirer.prompt([
                    {
                        name: 'employName',
                        message: "What is the employee's first name? "
                    },
                    {
                        name: 'employLast',
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
                        choices: employArr
                    }
                ]).then(( answer )=>{
                    let roleId, employId;
                    results.forEach((title) => {
                        if (answer.employRole === title.title){
                            roleId = title.id                          
                        }
                    })
                    result.forEach((names => {
                        if (answer.manager === names.first_name){
                            employId = names.id 
                        }
                    }))
                    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
                    const params = [answer.employName, answer.employLast, roleId, employId]
                    con.promise().query(sql,params )
                    .then(([rows, fields]) => {
                        console.log(`${answer.employName} ${answer.employLast} has been added to the database`)
                    })
                    .catch(console.log)
                    .then(() => con.end());
                })
            })
        })
        })
    }
    updateEmployee() {
        con.connect((err) => {
            if (err) throw err;
            con.query('SELECT first_name,id from employee',function(err, results, fields){
                let nameArr = []
                results.forEach((name2) => nameArr.push(name2.first_name))
                con.query('SELECT title,id FROM role',function(err,result, fields){
                    let roleArr = [];
                    result.forEach(role => roleArr.push(role.title));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'name',
                            message: "Which employee's name would you like to update? ",
                            choices: nameArr
                        },
                        {
                            type: 'list',
                            name: 'roleList',
                            message: "What is the employee's new role?",
                            choices: roleArr
                        }
                    ]).then(({name , roleList}) => {
                        let nameId, roleId;
                        results.forEach(empName => {
                           if (name === empName.first_name){
                             nameId = empName.id
                           }
                        })
                        result.forEach(roleName => {
                            if(roleList === roleName.title){
                                roleId = roleName.id
                            }
                        })
                        const sql = 'UPDATE employee SET role_id = ? WHERE employee.id = ?';
                        const params = [roleId, nameId]
                        con.promise().query(sql,params)
                        .then(([rows, fields]) => {
                            console.log(`${name} role has been updated`)
                        })
                        .catch(console.log)
                        .then(() => con.end());
                    })
                })
            })
        })
    }
}       
    


