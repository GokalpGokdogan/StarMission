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

module.exports = { getCompanyData };