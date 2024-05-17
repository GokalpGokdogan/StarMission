const db = require('../../database');

const getCompanyData = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { companyId } = data;
        let query = `SELECT * from company c, user u WHERE c.user_id = u.user_id AND u.user_id = ?;`;
        db.query(query, [companyId], (err, result) => {
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

const editProfile = async (companyId, data) => {
    return new Promise( async (resolve, reject) => {
        const { name, email, phone, password, foundation_date, description, balance } = data;
        
        if(name){
            let query = `UPDATE user SET name = ? WHERE user_id = ?;`;
            await db.query(query, [name, companyId], (err, result) => {
                
            });
        }

        if(email){
            query = `UPDATE company SET email = ? WHERE user_id = ?;`;
            await db.query(query, [email, companyId], (err, result) => {
                
            });
        }

        if(phone){
            query = `UPDATE company SET phone = ? WHERE user_id = ?;`;
            await db.query(query, [phone, companyId], (err, result) => {
                
            });
        }

        if(password){
            query = `UPDATE user SET password = ? WHERE user_id = ?;`;
            await db.query(query, [password, companyId], (err, result) => {
                
            });
        }

        if(foundation_date){    
            query = `UPDATE company SET foundation_date = ? WHERE user_id = ?;`;
            await db.query(query, [foundation_date, companyId], (err, result) => {
                
            });
        }

        if(description){
            query = `UPDATE company SET description = ? WHERE user_id = ?;`;
            await db.query(query, [description, companyId], (err, result) => {
                
            });
        }

        if(balance){
            query = `UPDATE company SET balance = ? WHERE user_id = ?;`;
            await db.query(query, [balance, companyId], (err, result) => {
                
            });
        }

        resolve("Profile updated.");
    });
}

module.exports = { getCompanyData, editProfile };