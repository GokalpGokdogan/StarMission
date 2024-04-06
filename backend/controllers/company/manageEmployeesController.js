const db = require('../../database');

//! Test ~ Delete this when tested
// Get employees with filters
const getEmployees = async (data) => {
    return new Promise((resolve, reject) => {
        
        const currentDate = data.currentDate;
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
                AND (CASE WHEN ? IS NOT NULL THEN a.age >= ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN a.age <= ? ELSE 1 END`,
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


exports.getEmployees = getEmployees;