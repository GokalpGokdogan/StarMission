const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MY_HOST,
    user: process.env.MY_USER,
    password: process.env.MY_PASSWORD,
    database: "StarMission",
    connectionLimit: 10
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        throw err;
    }
    console.log('Connected to database');
});


module.exports = db;