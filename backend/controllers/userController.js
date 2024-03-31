const userModel = require('../models/user');

const db = require('../database'); // Import the database connection

const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
}
