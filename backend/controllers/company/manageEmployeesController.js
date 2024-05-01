const db = require('../../database');


// Get employees with filters
const getEmployees = async (data) => {
    return new Promise((resolve, reject) => {
        const {companyId, searchedName, profession, minAge, maxAge, 
            sex, minWeight, maxWeight, minHeight, maxHeight, nationality} = data;

        db.query(`
                SELECT DISTINCT *, u.name AS astronaut_name, TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) AS age FROM user u, astronaut a, space_mission s, company c, mission_of m
                WHERE a.user_id = m.astronaut_id AND s.mission_id = m.mission_id AND a.user_id = u.user_id
                AND c.user_id = s.leading_firm_id AND c.user_id = ?
                AND (CASE WHEN ? IS NOT NULL THEN u.name LIKE ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN a.profession = ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) >= ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) <= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.sex = ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.nationality = ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.height >= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.height <= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.weight >= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN a.weight <= ? ELSE 1 END);`,
                [companyId, searchedName, searchedName, profession, profession, minAge, minAge,
                    maxAge, maxAge, sex, sex,nationality, nationality, minHeight, minHeight, 
                    maxHeight, maxHeight, minWeight, minWeight, maxWeight, maxWeight],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        reject("ER_FIND_NONE");     // No employees found with these filters
                    }
                    else {
                        console.log(result, "successful get employees with filters");
                        resolve(result);
                    }
                }
        );
    });
}


// Get employee data
// assumed user id will be provided

const getEmployeeData = async (data) => {
    return new Promise((resolve, reject) => {
        const {astronautId} = data;
        db.query(`SELECT *, TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) AS age FROM astronaut a, user u WHERE u.user_id = a.user_id AND a.user_id = ?`,
            [astronautId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No employee found with this id
                }
                else {
                    console.log(result, "successful get employee data");
                    resolve(result[0]);
                }
            }
        );
    });
}



// Fire employee
// assumed user id and mission id will be provided

const fireEmployee = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { astronautId, missionId } = data;
        
        let query = `UPDATE mission_of SET leaving_date = CURDATE() WHERE astronaut_id = ? AND mission_id = ?`;
        db.query(query,
            [astronautId, missionId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No employee found working on the mission with this id
                }
                else {
                    console.log(result, "successful fire employee");
                    resolve(result);
                }
            }
        );
    });
}



module.exports = { getEmployees, getEmployeeData, fireEmployee}