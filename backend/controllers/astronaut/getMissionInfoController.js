const db = require('../../database');

const getCurrentMission = async (astronaut_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT DISTINCT s.*, o.starting_date, o.leaving_date , o.salary FROM mission_of o, space_mission s WHERE o.astronaut_id = ? AND o.mission_id = s.mission_id AND o.leaving_date IS NULL;";
        db.query(query, [astronaut_id], (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length === 0){
                reject("ER_FIND_NONE");
            }
            else{
                console.log(result, "successful current mission data");
                resolve(result);
            }
        });
    });
};

const getPastMissions = async (astronaut_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT DISTINCT s.*, o.starting_date, o.leaving_date, o.salary FROM mission_of o, space_mission s WHERE o.astronaut_id = ? AND o.mission_id = s.mission_id AND o.leaving_date IS NOT NULL;";
        db.query(query, [astronaut_id], (err, result) => {
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

        const { searchedName, startDate, endDate, location,
            leadingCompanyName, minBudget, maxBudget } = data;

        let query = `SELECT DISTINCT * FROM space_mission s WHERE
                    NOT EXISTS (SELECT * FROM mission_of m WHERE s.mission_id = m.mission_id AND m.astronaut_id = ? AND m.leaving_date IS NULL)
                    AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.location = ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN c.name LIKE ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)`;
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

module.exports = {getCurrentMission, getPastMissions, getRecentMissions};