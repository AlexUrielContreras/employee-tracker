const mysql = require('mysql2')

const con = mysql.createConnection(
    {
        host:'localhost', 
        user: 'root', 
        password:'Gtrnissan2023!', 
        database: 'tracker'
    }
  );
module.exports = con;