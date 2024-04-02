const e = require('express');
const db = require('../database');

// Get all users





// Register
const register = async (data) => {
    // get user data
    return new Promise((resolve, reject) => {

    const name = data.name //? data.name : null;
    const email = data.email //? data.email : null;
    const phone = data.phone //? data.phone : null;
    const password = data.password //? req.body.password : null;
    const creationDate = new Date();

    let query = 'INSERT INTO user(name, email, phone, password, creation_date) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [name, email, phone, password, creationDate], (err, result, fields) => {
        if (err) {
            // console.log(err);
            reject(err);
        }
        else{

            console.log(result, "successful registration");
            resolve(result);
        }
    }
    );
    
})
};

const login = async(data) => {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        db.query('SELECT * FROM user WHERE user.email = ? AND user.password = ?', [email, password], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.length === 0) {
                reject("Invalid email or password");
            }
            else {
                resolve(result);
            }
        });
    });
};

exports.register = register;
exports.login = login;