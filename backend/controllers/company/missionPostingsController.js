const db = require('../../database');


// Get mission postings with filters
// assumed companyId will be provided

const getMissionPostings = async (data) => {
    return new Promise((resolve, reject) => {

        let { companyId, searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;

        if (searchedName != null) { searchedName = "%" + searchedName + "%"; }
        if (location != null) { location = "%" + location + "%"; }

        console.log(data, "data in getMissionPostings");

        let query = `SELECT s.*, u.name AS company_name FROM space_mission as s, company as c, user as u
                            WHERE (c.user_id = s.leading_firm_id AND c.user_id <> ? AND c.user_id = u.user_id)
                            AND NOT EXISTS (SELECT * FROM partner_firm p WHERE p.mission_id = s.mission_id AND p.company_id = ?)
                            AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                            AND s.end_date >= CURDATE()
                            AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.location LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                            ORDER BY s.creation_date DESC;`;
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

// Get past mission postings with filters
// assumed companyId will be provided

const getPastMissionPostingsLead = async (data) => {
    return new Promise((resolve, reject) => {

        let { companyId, searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;
        if (searchedName != null) { searchedName = "%" + searchedName + "%"; }
        if (location != null) { location = "%" + location + "%"; }

        let query = `SELECT s.*, u.name AS company_name FROM space_mission as s, company as c, user as u
                            WHERE (c.user_id = s.leading_firm_id AND c.user_id = ? AND c.user_id = u.user_id)
                            AND s.end_date < CURDATE()
                            AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.location LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                            ORDER BY s.creation_date DESC;`;
        db.query(query, [companyId, searchedName, searchedName, startDate, startDate, endDate, endDate,
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

const getPastMissionPostingsPartner = async (data) => {
    return new Promise((resolve, reject) => {

        let { companyId, searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;
        if (searchedName != null) { searchedName = "%" + searchedName + "%"; }
        if (location != null) { location = "%" + location + "%"; }

        let query = `
                        SELECT s.*, u.name AS company_name FROM space_mission as s,
                        partner_firm p, company c, user u
                        WHERE p.company_id = ? AND c.user_id = s.leading_firm_id AND p.mission_id = s.mission_id
                        AND u.user_id = c.user_id
                        AND s.end_date < CURDATE()
                        AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                        AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                        AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELS  E 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.location LIKE ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                        ORDER BY s.creation_date DESC;`;
        db.query(query, [companyId, searchedName, searchedName, startDate, startDate, endDate, endDate,
            location, location, leadingCompanyName, leadingCompanyName, minBudget, minBudget, maxBudget, maxBudget],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");
                }
                else {
                    console.log(result, "successful get mission postings with filters");
                    resolve(result);
                }
            }
        );
    });
}

const getPartnerMissions = async (data) => {
    return new Promise((resolve, reject) => {

        let { companyId, searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;
        if (searchedName != null) { searchedName = "%" + searchedName + "%"; }
        if (location != null) { location = "%" + location + "%"; }

        let query = `SELECT s.*, u_in.name AS company_name FROM space_mission as s, partner_firm p, company c, user u, user u_in
                            WHERE (p.mission_id = s.mission_id AND p.company_id = ? AND c.user_id = u.user_id 
                            AND c.user_id = p.company_id AND s.leading_firm_id <> c.user_id)
                            AND s.leading_firm_id = u_in.user_id
                            AND s.end_date >= CURDATE()
                            AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                            AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.location LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN u_in.name LIKE ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                            AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                            ORDER BY s.creation_date DESC;`;
        db.query(query, [companyId, searchedName, searchedName, startDate, startDate, endDate, endDate,
            location, location, leadingCompanyName, leadingCompanyName, minBudget, minBudget, maxBudget, maxBudget],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No partner missions found with these filters
                }
                else {
                    console.log(result, "successful get partner missions with filters");
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
        let query = `SELECT DISTINCT s.*, u.name AS company_name FROM space_mission s, company c, user u WHERE s.mission_id = ? AND c.user_id = s.leading_firm_id AND c.user_id = u.user_id;

                     SELECT DISTINCT u.name as company_name
                     FROM user u, partner_firm p
                     WHERE p.mission_id = ? AND u.user_id = p.company_id;`;
        db.query(query, [missionId, missionId], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result[0].length === 0) {
                reject("ER_FIND_NONE");     // No mission found
            }
            else {
                result[0][0].partner_firms = result[1];
                let partnerNames = result[0][0].partner_firms.map(partner => partner.company_name);

                result[0][0].partner_firms = partnerNames;

                if (result[0][0].important_notes) {
                    result[0][0].important_notes = result[0][0].important_notes.split("$$$$");
                }
                else {
                    result[0][0].important_notes = [];
                }
                resolve(result[0][0]);
            }
        });
    });
}

// Bid To Mission
const bidToMission = async (data) => {
    return new Promise((resolve, reject) => {
        const { companyId, missionId, amount, description } = data;

        let query = `SELECT DISTINCT s1.*, s2.start_date as s2Start, s2.end_date as s2End FROM space_mission s1, space_mission s2, partner_firm p, mission_bid b, user u
        WHERE((s1.mission_id = p.mission_id AND p.company_id = ?) OR s1.leading_firm_id = ?) AND s2.mission_id = ?
        AND((s2.start_date < s1.start_date AND s2.end_date > s1.end_date)OR(s2.end_date > s1.start_date AND s2.end_date <= s1.end_date)OR(s2.start_date > s1.start_date AND s2.start_date <= s1.end_date));`;

        db.query(query, [companyId, companyId, missionId], (err, result) => {
            if (err) {
                reject(err);
            }
            else if (result.length > 0) {
                reject("DATE_CONFLICT");
            }
            else {
                query = `INSERT INTO mission_bid (requested_amount, description, mission_id, bid_date, bid_status, bidding_company_id) 
                    VALUES (?, ?, ?, CURDATE(), 'In progress', ?)`;
                db.query(query, [amount, description, missionId, companyId], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {

                        console.log(result, "successful bid to mission");
                        resolve("SUCCESS");
                    }
                });
            }
        });
    });
}

/* Terminate Mission
    (end_date is set to current date)
    (astronauts working in that mission are set free)
*/
const terminateMission = async (data) => {
    return new Promise((resolve, reject) => {
        const { missionId } = data;

        let query = `UPDATE space_mission SET end_date = CURDATE() WHERE mission_id = ?; 
                     UPDATE mission_of SET leaving_date = CURDATE() WHERE mission_id = ? AND leaving_date IS NULL;`;
        db.query(query, [missionId, missionId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

module.exports = { getMissionPostings, getLeadingFirmNames, getPastMissionPostingsPartner, getPastMissionPostingsLead, getMissionData, bidToMission, getPartnerMissions, terminateMission };