import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hugo0407',
  database: 'db_desafio_aps'
});

export default connection;