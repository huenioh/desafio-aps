import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hugo0407',
  database: 'crud_react'
});

export default connection;