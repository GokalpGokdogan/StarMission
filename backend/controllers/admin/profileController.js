const db = require('../../database');

const getAdminData = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { adminId } = data;
        let query = `SELECT * from admin a, user u WHERE a.user_id = u.user_id AND u.user_id = ?;`;
        db.query(query, [adminId], (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No companies found for this id
                }
                else {
                    resolve(result[0]);
                }
            }
        );
    });
};


const editProfile = async (data) => {
    return new Promise((resolve, reject) => {

        const { adminId, name, email, phone, password} = data;
        
        let query = ``;
        if(name){
            query += `UPDATE user SET name = '${name}' WHERE user_id = ${adminId};`;
        }

        if(email){
            query += `UPDATE user SET email = '${email}' WHERE user_id = ${adminId};`;
        }

        if(phone){
            query += `UPDATE user SET phone = '${phone}' WHERE user_id = ${adminId};`;
        }

        if(password){
            query += `UPDATE user SET password = '${password}' WHERE user_id = ${adminId};`;
        }

        db.query(query, [], (err, result) => {
            console.log(data);
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports = { getAdminData, editProfile };