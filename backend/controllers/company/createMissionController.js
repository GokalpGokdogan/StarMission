const db = require('../../database');


/**
 *  CONCERNS
 *  HOW TO UNDERSTAND IF BUDGET EXCEEDS BALANCE
 */

const createMission = async (data) => {
    return new Promise((resolve, reject) => {
        const { companyId, name, location, start_date, end_date, description, budget, important_notes } = data;
        let query = `SELECT DISTINCT * FROM space_mission s
                    WHERE s.name = ?;`;    // checks if the given name is already taken
        db.query(query, [name], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.length === 0) {     // no conflicting names, may continue
                query = `SELECT * FROM company c WHERE c.user_id = ? AND c.balance >= ?;`;   // checks if given budget exceeds company balance
                db.query(query, [companyId, budget], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length === 0) {
                        reject("MISSION BUDGET EXCEEDS BALANCE");
                    }
                    else {
                        query = `INSERT INTO space_mission (name, location, creation_date, start_date, end_date, description, budget, leading_firm_id, important_notes)
                    VALUES (?, ?, CURDATE(), ?, ?, ?, ?, ?, ?);`;
                        db.query(query, [name, location, start_date, end_date, description, budget, companyId, important_notes, budget, companyId], (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                query = "UPDATE company SET balance = balance - ? WHERE user_id = ?;";
                                db.query(query, [budget, companyId], (err, result) => {
                                    if(err){
                                        reject(err);
                                    }
                                    else{resolve(result);}
                                });
                            }
                        });
                    }
                });
            }
            else {
                reject("MISSION NAME IS ALREADY TAKEN");
            }
        }
        );
    });
};

module.exports = { createMission };