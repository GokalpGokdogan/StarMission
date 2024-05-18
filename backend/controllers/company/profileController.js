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

const editProfile = async (data) => {
    return new Promise((resolve, reject) => {

        const { companyId, name, email, phone, password, foundation_date, description, balance } = data;
        
        let query = ``;
        if(name){
            query += `UPDATE user SET name = "${name}" WHERE user_id = ${companyId};`;
        }

        if(email){
            query += `UPDATE user SET email = "${email}" WHERE user_id = ${companyId};`;
        }

        if(phone){
            query += `UPDATE user SET phone = "${phone}" WHERE user_id = ${companyId};`;
        }

        if(password){
            query += `UPDATE user SET password = "${password}" WHERE user_id = ${companyId};`;
        }

        if(foundation_date){    
            query += `UPDATE company SET foundation_date = "${foundation_date}" WHERE user_id = ${companyId};`;
        }

        if(description){
            query += `UPDATE company SET description = "${description}" WHERE user_id = ${companyId};`;
        }

        if(balance){
            query += `UPDATE company SET balance = ${balance} WHERE user_id = ${companyId};`;
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

module.exports = { getCompanyData, editProfile };