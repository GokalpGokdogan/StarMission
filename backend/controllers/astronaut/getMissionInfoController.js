const db = require('../../database');

const getCurrentMissionExtract = async (astronaut_id) => {
    return new Promise((resolve, reject) => {

        const query = ` SELECT DISTINCT s.* ,u.name as company_name , o.starting_date, o.salary 
                        FROM mission_of o, space_mission s, user u
                        WHERE o.astronaut_id = ? AND o.mission_id = s.mission_id
                        AND o.leaving_date IS NULL AND s.leading_firm_id = u.user_id;`;
        db.query(query, [astronaut_id], (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length === 0){
                reject("ER_FIND_NONE");
            }
            else{
                console.log(result, "successful current mission data");
                if(result[0].important_notes){
                    result[0].important_notes = result[0].important_notes.split("$$$$");
                }
                else{
                    result[0].important_notes = [];
                }
                resolve(result[0]);
            }
        });
    });
};

const getCurrentMission = async (astronaut_id) => {
    return new Promise((resolve, reject) => {

        const query = ` SELECT DISTINCT s.* ,u.name as company_name , o.starting_date, o.salary 
                        FROM mission_of o, space_mission s, user u
                        WHERE o.astronaut_id = ? AND o.mission_id = s.mission_id
                        AND o.leaving_date IS NULL AND s.leading_firm_id = u.user_id;`;
        db.query(query, [astronaut_id], (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length === 0){
                reject("ER_FIND_NONE");
            }
            else{
                console.log(result, "successful current mission data");
                if(result[0].important_notes){
                    result[0].important_notes = result[0].important_notes.split("$$$$");
                }
                else{
                    result[0].important_notes = [];
                }
                resolve(result[0]);
            }
        });
    });
};

const getPastMissions = async (astronaut_id, data) => {
    return new Promise((resolve, reject) => {

        let { searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;
            if(searchedName != null){searchedName = "%"+searchedName+"%";}

        const query = `SELECT DISTINCT s.*, o.starting_date, o.leaving_date, o.salary 
                        FROM mission_of o, space_mission s 
                        WHERE o.astronaut_id = ? AND o.mission_id = s.mission_id 
                        AND o.leaving_date IS NOT NULL 
                        AND s.end_date < CURDATE()
                        AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                        AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                        AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.location = ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                        AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                        ORDER BY s.creation_date DESC;`;
        db.query(query, [astronaut_id, searchedName, searchedName, startDate, startDate, endDate, endDate, 
            location, location, leadingCompanyName, leadingCompanyName, minBudget, minBudget, maxBudget, maxBudget], (err, result) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else if(result.length === 0){
                reject("ER_FIND_NONE");
            }
            else{
                console.log(result, "successful past mission data");
                resolve(result);
            }
        });
    });
};

const getRecentMissions = async (astronaut_id, data) => {
    return new Promise((resolve, reject) => {

        let { searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;
            if(searchedName != null){searchedName = "%"+searchedName+"%";}

        let query = `SELECT DISTINCT *, s.name AS mission_name FROM space_mission s, user u WHERE
                    NOT EXISTS (SELECT * FROM mission_of m WHERE s.mission_id = m.mission_id 
                    AND m.astronaut_id = ? AND m.leaving_date IS NULL)
                    AND s.leading_firm_id = u.user_id
                    AND s.end_date > CURDATE()
                    AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.location = ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                    ORDER BY s.creation_date DESC;`;
        db.query(query, [astronaut_id, searchedName, searchedName, startDate, startDate, endDate, endDate, 
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
};

module.exports = {getCurrentMission, getPastMissions, getRecentMissions, getCurrentMissionExtract};