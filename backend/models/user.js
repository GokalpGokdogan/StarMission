const db = require('../database'); // adjust the path according to your project structure

// constructor
const User = function(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.creation_date = user.creation_date;
};



// create user
User.create = (newUser, result) => {
    db.query('INSERT INTO user SET ?', newUser, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
            return;
        }
        console.log('User created successfully');
        result(null, res);
    });
};

// get user by id
User.findById = (id, result) => {
    db.query(`SELECT * FROM user WHERE user_id = ${id}`, (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// get user by email
User.findByEmail = (email, result) => {
    db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log('Error while fetching user by email', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// get user by username
User.findByUsername = (username, result) => {
    db.query(`SELECT * FROM user WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// update user by id
User.updateById = (id, user, result) => {
    db.query(
        'UPDATE user SET username = ?, email = ?, phone = ?, password = ? WHERE user_id = ?',
        [user.username, user.email, user.phone, user.password, id],
        (err, res) => {
            if (err) {
                console.log('Error while updating user by id', err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }
            console.log('Updated user: ', { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

// delete user by id
User.deleteById = (id, result) => {
    db.query('DELETE FROM user WHERE user_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while deleting user by id', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted user with id: ', id);
        result(null, res);
    });
};



// Export the model
module.exports = {
    create,
    findById,
    findByEmail,
    findByUsername,
    updateById,
    deleteById
};