const db = require('../../database');

const mostSalaryAstronauts = async (data) => {
    return new Promise((resolve, reject) => {

        const {missionId} = data;

        const query = ` DROP VIEW IF EXISTS MostSalaryAstronauts;
        
                        CREATE VIEW MostSalaryAstronauts AS
                        SELECT u.name, a.profession, m.salary
                        FROM astronaut a, user u, mission_of m
                        WHERE u.user_id = a.user_id AND m.astronaut_id = a.user_id AND m.mission_id = ? AND m.leaving_date IS NULL ORDER BY m.salary DESC;`;

        db.query(query, [missionId], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful MostSalaryAstronauts view creation");
                resolve(result);
            }
        });
    });
};

module.exports = {mostSalaryAstronauts};