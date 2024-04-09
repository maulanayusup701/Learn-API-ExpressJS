require('dotenv').config();
const host = process.env.MYSQL_HOST || 'localhost';
const user = process.env.MYSQL_USER || '';
const password = process.env.MYSQL_PASSWORD || '';
const database = process.env.MYSQL_DATABASE || '';
const mysql = require('mysql');
const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});

module.exports = db;
