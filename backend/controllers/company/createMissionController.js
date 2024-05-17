const db = require('../../database');


/**
 *  CONCERNS
 *  HOW TO UNDERSTAND IF BUDGET EXCEEDS BALANCE
 */

const createMission = async (data) => {
    return new Promise((resolve, reject) => {
        const { companyId, name, location, start_date, end_date, description, budget, important_notes } = data;
        let query = `INSERT INTO space_mission (name, location, creation_date, start_date, end_date, description, budget, leading_firm_id, important_notes)
                     VALUES (?, ?, CURDATE(), ?, ?, ?, ?, ?, ?);`;

        db.query(query, [name, location, start_date, end_date, description, budget, companyId, important_notes, budget, companyId], (err, result) => {
            if (err) {
                reject(err.sqlMessage);
            }
            else {
                resolve(result)
            }
        });

    });
};

module.exports = { createMission };