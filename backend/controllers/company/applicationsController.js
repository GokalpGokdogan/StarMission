const db = require('../../database');

//! Test ~ Delete this when tested
// Get applicant data
// assumed user id will be provided

const getApplicantData = async (data) => {
    return new Promise((resolve, reject) => {
        const {employeeId} = data;
        db.query(`SELECT * FROM astronaut a, user u WHERE u.user_id = a.user_id AND a.user_id = ?`,
            [employeeId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No applicant found with this id
                }
                else {
                    console.log(result, "successful get applicant data");
                    resolve(result);
                }
            }
        );
    });
}


//! Test ~ Delete this when tested
// get applications with filters
// assumed companyId will be provided

const getApplications = async (data) => {
    return new Promise((resolve, reject) => {
        


        const { selfCompanyId, searchedName, profession, 
            minAge, maxAge, sex, minWeight, maxWeight, 
            minHeight, maxHeight, nationality, missionName } = data;


        let query = `SELECT * FROM astronaut a, space_mission s, company c, applied_mission m
                    WHERE a.user_id = m.astronaut_id AND s.mission_id = m.mission_id 
                    AND c.user_id = s.leading_firm_id AND c.company_id = ? 
                    AND (CASE WHEN ? IS NOT NULL THEN a.name LIKE ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN a.profession = ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) >= ? ELSE 1 END) 
                    AND (CASE WHEN ? IS NOT NULL THEN TIMESTAMPDIFF(YEAR,  a.birth_date, CURDATE()) <= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.sex = ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.nationality = ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.height >= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.height <= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.weight >= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN a.weight <= ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN s.mission_name = ? ELSE 1 END)`;

                    // if mission name is like a search bar, then use the following line
                    //AND (CASE WHEN ? IS NOT NULL THEN s.mission_name LIKE ? ELSE 1 END) 

            db.query(query,
                [selfCompanyId, searchedName, searchedName, profession, profession, minAge, minAge, 
                    maxAge, maxAge, sex, sex,nationality, nationality, minHeight, minHeight, 
                    maxHeight, maxHeight, minWeight, minWeight, maxWeight, maxWeight, missionName, missionName], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        reject("ER_FIND_NONE");     // No applicants found with these filters
                    }
                    else {
                        console.log(result, "successful get applicants with filters");
                        resolve(result);
                    }
                }
        );
    });
}


//TODO: accept application


//TODO: reject application




module.exports = { getApplicantData, getApplications };