const db = require('../../database');

const applyToMission = async (astronaut_id, data) => {
    return new Promise((resolve, reject) => {

        const {missionId, cover_letter} = data;
        let query = "SELECT * FROM mission_of m WHERE m.astronaut_id = ? AND m.leaving_date IS NULL;";
        db.query(query, [astronaut_id, missionId], (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length > 0){
                reject("ALREADY_IN_A_MISSION");
            }
            else{
                query = "INSERT INTO applied_mission VALUES (?, ?, ?, CURDATE(), ?)";
                db.query(query, [missionId, astronaut_id, cover_letter, "Processing"], (err2, result2) => {
                    if(err2){
                        reject(err2);
                    }
                    else{
                        resolve(result2);
                    }
                });
            }
        });
    });
};

const leaveMission = async (astronaut_id, data) => {
    return new Promise((resolve, reject) => {

        const {missionId} = data;
        let query = `UPDATE mission_of m
                    SET m.leaving_date = CURDATE()
                    WHERE m.mission_id = ? AND m.astronaut_id = ? AND m.leaving_date IS NULL;`;
        db.query(query, [missionId, astronaut_id], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
};

const getApplications = async (astronaut_id, data) => {
    return new Promise((resolve, reject) => {
        const { start_date, end_date, mission_id, application_status } = data;

        const query = `SELECT DISTINCT * FROM applied_mission a, space_mission s WHERE a.astronaut_id = ? 
        AND a.mission_id = s.mission_id
        AND (CASE WHEN ? IS NOT NULL THEN a.applied_date >= ? ELSE 1 END) 
        AND (CASE WHEN ? IS NOT NULL THEN a.applied_date <= ? ELSE 1 END)
        AND (CASE WHEN ? IS NOT NULL THEN a.mission_id = ? ELSE 1 END)
        AND (CASE WHEN ? IS NOT NULL THEN a.application_status = ? ELSE 1 END)
        ORDER BY a.applied_date DESC;`;
        db.query(query, [astronaut_id, start_date, start_date, end_date, end_date, mission_id, mission_id, application_status, application_status], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
};

module.exports = {applyToMission, getApplications, leaveMission};