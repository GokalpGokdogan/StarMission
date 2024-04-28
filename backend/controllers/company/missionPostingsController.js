const db = require('../../database');


// Get mission postings with filters
// assumed companyId will be provided

const getMissionPostings = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { companyId, searchedName, startDate, endDate, location, 
            leadingCompanyName, minBudget, maxBudget } = data;

            let query = `SELECT * FROM space_mission as s, company as c, user as u
                            WHERE (c.user_id = s.leading_firm_id AND c.user_id <> ? AND c.user_id = u.user_id)
                            AND NOT EXISTS (SELECT * FROM partner_firm p WHERE p.mission_id = s.mission_id AND p.company_id = ?)
                            AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.location = ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)`;
            db.query(query, [companyId, companyId, searchedName, searchedName, startDate, startDate, endDate, endDate, 
            location, location, leadingCompanyName, leadingCompanyName, minBudget, minBudget, maxBudget, maxBudget], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No mission postings found with these filters
                }
                else {
                    console.log(result, "successful get mission postings with filters");
                    resolve(result);
                }
            }
            );
    });
}


// leadingFirmNames

const getLeadingFirmNames = async (data) => {
    return new Promise((resolve, reject) => {
        const { companyId } = data;
        let query = `SELECT DISTINCT u.name FROM company c, space_mission s, user u WHERE c.user_id = s.leading_firm_id AND c.user_id <> ? AND c.user_id = u.user_id`;
        db.query(query, [companyId], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.length === 0) {
                reject("ER_FIND_NONE");     // No leading firms found
            }
            else {
                console.log(result, "successful get leading firm names");
                resolve(result);
            }
        }
    );
    });
}


// Get Mission Data

const getMissionData = async (data) => {
    return new Promise((resolve, reject) => {
        const { missionId } = data;
        let query = `SELECT DISTINCT * FROM space_mission s, company c, user u WHERE s.mission_id = ? AND c.user_id = s.leading_firm_id AND c.user_id = u.user_id`;
        db.query(query, [missionId], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.length === 0) {
                reject("ER_FIND_NONE");     // No mission found
            }
            else {
                console.log(result, "successful get mission data");
                resolve(result);
            }
        });
    });
}


// Bid To Mission

const bidToMission = async (data) => {
    return new Promise((resolve, reject) => {
        const { companyId, missionId, amount, description } = data;
                
        // application_status: 0~Pending, 1~Accepted, 2~Rejected

        let query = `INSERT INTO mission_bid (requested_amount, description, mission_id, bid_date, bid_status, bidding_company_id) 
                    VALUES (?, ?, ?, CURDATE(), 0, ?)`;
        db.query(query, [amount, description, missionId, companyId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(result, "successful bid to mission");
                resolve("SUCCESS");
            }
        });
    });
}


module.exports = { getMissionPostings, getLeadingFirmNames, getMissionData, bidToMission };