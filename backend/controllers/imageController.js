const db = require('../database');

const getImageById = async (data) => {
    return new Promise((resolve, reject) => {
        const { userId } = data;
        db.query(`SELECT u.image_url FROM user u WHERE u.user_id = ?;`,
            [userId],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No user found with this id
                }
                else {
                    resolve(result[0].image_url);
                }
            }
        );
    });
}

const getImageByName = async (data) => {
    return new Promise((resolve, reject) => {
        const { username } = data;
        db.query(`SELECT u.image_url FROM user u WHERE u.name = ?;`,
            [username],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No user found with this name
                }
                else {
                    resolve(result[0].image_url);
                }
            }
        );
    });
}

module.exports = { getImageById, getImageByName };