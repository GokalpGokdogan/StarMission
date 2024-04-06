const db = require('../../database');

//! Test ~ Delete this when tested
// Get employees with filters
const getEmployees = async (data) => {
    return new Promise((resolve, reject) => {
        
        const selfCompanyId = data.companyId;
        const searchedName = data.searchedName;
        const profession = data.profession;
        const minAge = data.minAge;
        const maxAge = data.maxAge;


        db.query(`
                SELECT * FROM astronaut a, space_mission s, company c, mission_of m
                WHERE a.user_id = m.astronaut_id AND s.mission_id = m.mission_id 
                AND c.user_id = s.leading_firm_id AND c.company_id = ? 
                AND (CASE WHEN ? IS NOT NULL THEN a.name LIKE ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN a.profession = ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) >= ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) <= ? ELSE 1 END`,
                [selfCompanyId, searchedName, searchedName, profession, profession, minAge, minAge, maxAge, maxAge], 
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

//! Test ~ Delete this when tested
// Get employee data
// assumed user id will be provided

const getEmployeeData = async (data) => {
    return new Promise((resolve, reject) => {
        const employeeId = data.employeeId;
        db.query(`SELECT * FROM astronaut a, user u WHERE u.user_id = a.user_id AND a.user_id = ?`,
            [employeeId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No employee found with this id
                }
                else {
                    console.log(result, "successful get employee data");
                    resolve(result);
                }
            }
        );
    });
}


//! Test ~ Delete this when tested
// Fire employee
// assumed user id and mission id will be provided

const fireEmployee = async (data) => {
    return new Promise((resolve, reject) => {
        const employee_id = data.employee_id;
        const mission_id = data.mission_id;
        
        let query = `UPDATE mission_of SET leaving_date = CURDATE() WHERE user_id = ? AND mission_id = ?`;
        db.query(query,
            [employee_id, mission_id], 
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



exports.getEmployees = getEmployees;
exports.getEmployeeData = getEmployeeData;
exports.fireEmployee = fireEmployee;