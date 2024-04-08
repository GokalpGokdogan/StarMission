const db = require('../database');

// Get all users





// Register
const registerAstronaut = async (data) => {
    // get user data
    return new Promise((resolve, reject) => {

    const name = data.name; //? data.name : null;
    const email = data.email; //? data.email : null;
    const phone = data.phone; //? data.phone : null;
    const password = data.password; //? req.body.password : null;
    const creationDate = new Date();

    const nationality = data.nationality;
    const birth_date = data.birth_date;
    const sex = data.sex;

    let queryUser = 'INSERT INTO user(name, email, phone, password, creation_date) VALUES (?, ?, ?, ?, ?); ';
    let queryAstronaut = 'INSERT INTO astronaut(user_id, nationality, birth_date, sex) VALUES (?, ?, ?, ?); ';
    
    db.query(queryUser, [name, email, phone, password, creationDate], (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else{
            const insertedID = result.insertId;
            db.query(queryAstronaut, [insertedID, nationality, birth_date, sex], (err, result, fields) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        }
    }
    );
    
})
};

// Register Company
const registerCompany = async (data) => {
    // get user data
    return new Promise((resolve, reject) => {

    const name = data.name; //? data.name : null;
    const email = data.email; //? data.email : null;
    const phone = data.phone; //? data.phone : null;
    const password = data.password; //? req.body.password : null;
    const creationDate = new Date();

    let queryUser = 'INSERT INTO user(name, email, phone, password, creation_date) VALUES (?, ?, ?, ?, ?); ';
    let queryCompany = 'INSERT INTO company(user_id) VALUES (?); ';
    
    db.query(queryUser, [name, email, phone, password, creationDate], (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else{
            const insertedID = result.insertId;
            db.query(queryCompany, [insertedID], (err, result, fields) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        }
    }
    );
    
})
};

const login = async(data) => {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        db.query('SELECT * FROM user u WHERE u.email = ? AND u.password = ?', [email, password], (err, result) => {
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

// get user type
const getUserType = async(id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM astronaut u WHERE u.user_id = ?', [id], (err, result) => {
            if (err || result.length == 0) {
                db.query('SELECT * FROM company u WHERE u.user_id = ?', [id], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length == 0) {
                        resolve("admin");
                    }
                    else {
                        resolve('company');
                    }
                });
                
            }
            else {
                resolve('astronaut');
            }
        });
    });
};

module.exports = { registerAstronaut, registerCompany, login, getUserType };