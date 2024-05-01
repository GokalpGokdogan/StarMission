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
            minHeight, maxHeight, nationality, missionName, appStatus} = data;


        let query = `SELECT * FROM astronaut a, space_mission s, company c, applied_mission m
                    WHERE a.user_id = m.astronaut_id AND s.mission_id = m.mission_id 
                    AND c.user_id = s.leading_firm_id AND c. = ?
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
                    AND (CASE WHEN ? IS NOT NULL THEN s.mission_name = ? ELSE 1 END)
                    AND (CASE WHEN ? IS NOT NULL THEN m.application_status = ? ELSE 1 END)`;

                    // if mission name is like a search bar, then use the following line
                    //AND (CASE WHEN ? IS NOT NULL THEN s.mission_name LIKE ? ELSE 1 END) 

            db.query(query,
                [selfCompanyId, searchedName, searchedName, profession, profession, minAge, minAge, 
                    maxAge, maxAge, sex, sex,nationality, nationality, minHeight, minHeight, 
                    maxHeight, maxHeight, minWeight, minWeight, maxWeight, maxWeight, missionName, missionName,
                    appStatus, appStatus], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        reject("ER_FIND_NONE");     // No applicants found with these filters
                    }
                    else {
                        result.applied_date = result.applied_date.toISOString().split('T')[0];
                        console.log(result, "successful get applicants with filters");
                        resolve(result);
                    }
                }
        );
    });
}

//! Test ~ Delete this when tested
// Accept application (company decides)

const acceptApplicationC = async (data) => {
    return new Promise((resolve, reject) => {
        const {astronautId, missionId, salary, startDate} = data;
        // application_status: 0~Processing, 1~Accepted, 2~Rejected
        db.query(`UPDATE applied_mission SET application_status = 1 WHERE astronaut_id = ? AND mission_id = ?`,
            [astronautId, missionId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(result, "successful accept application");
                    db.query(`INSERT INTO mission_of (astronaut_id, mission_id, salary, start_date) VALUES (?, ?, ?, ?)`,
                        [astronautId, missionId, salary, startDate], 
                        (err2, result2) => {
                            if (err2) {
                                reject(err2);
                            }
                            else {
                                console.log(result2, "successful insert into astronaut_mission");
                                resolve(result2);
                            }
                        }
                    );
                }
            }
        );

        



    });
}

//! Test ~ Delete this when tested
// Accept application (astronaut decides)

const acceptApplicationA = async (data) => {
    return new Promise((resolve, reject) => {
        const {astronautId, missionId, salary, startDate} = data;
        // application_status: 0~Processing, 1~Accepted, 2~Rejected
        db.query(`UPDATE applied_mission SET application_status = 1 WHERE astronaut_id = ? AND mission_id = ?`,
            [astronautId, missionId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(result, "successful accept application");

                    db.query(`INSERT INTO mission_of (astronaut_id, mission_id, salary, start_date) VALUES (?, ?, ?, ?)`,
                        [astronautId, missionId, salary, startDate], 
                        (err2, result2) => {
                            if (err2) {
                                reject(err2);
                            }
                            else {
                                console.log(result2, "successful insert into mission_of");
                                resolve(result2);
                            }
                        });
                    
                    
                }
            }
        );

        

    });
}

//! This can be used if frontend doesn't want to provide salary and start date
// const acceptApplicationA = async (data) => {
//     return new Promise((resolve, reject) => {
//         const {astronautId, missionId} = data;
//         // application_status: 0~Processing, 1~Accepted, 2~Rejected
//         db.query(`UPDATE applied_mission SET application_status = 1 WHERE astronaut_id = ? AND mission_id = ?`,
//             [astronautId, missionId], 
//             (err, result) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     console.log(result, "successful accept application");

//                     db.query(`SELECT * FROM applied_mission WHERE astronaut_id = ? AND mission_id = ?`,
//                         [astronautId, missionId], 
//                         (err2, result2) => {
//                             if (err2) {
//                                 reject(err2);
//                             }
//                             else {
//                                 console.log(result2, "successful get application");

//                                 db.query(`INSERT INTO mission_of (astronaut_id, mission_id, salary, start_date) VALUES (?, ?, ?, ?)`,
//                                     [astronautId, missionId, result2[0].salary, result2[0].start_date], 
//                                     (err3, result3) => {
//                                         if (err3) {
//                                             reject(err3);
//                                         }
//                                         else {
//                                             console.log(result3, "successful insert into mission_of");
//                                             resolve(result3);
//                                         }
//                                     }
//                                 );
//                             }
//                         }
//                     );
//                 }
//             }
//         );

        

//     });
// }

//! Test ~ Delete this when tested
// Get application data

const getApplicationData = async (data) => {
    return new Promise((resolve, reject) => {
        const {astronautId, missionId, applied_date} = data;
        db.query(`SELECT * FROM applied_mission WHERE astronaut_id = ? AND mission_id = ? AND applied_date `,
            [astronautId, missionId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No application found with this id
                }
                else {
                    console.log(result, "successful get application data");
                    resolve(result);
                }
            }
        );
    });
}

//! Test ~ Delete this when tested
// Reject application

const rejectApplication = async (data) => {
    return new Promise((resolve, reject) => {
        const {astronautId, missionId} = data;
        // application_status: 0~Processing, 1~Accepted, 2~Rejected
        db.query(`UPDATE applied_mission SET application_status = 2 WHERE astronaut_id = ? AND mission_id = ?`,
            [astronautId, missionId], 
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(result, "successful reject application");
                    resolve(result);
                }
            }
        );
    });
}




module.exports = { getApplicantData, getApplications, acceptApplicationC, acceptApplicationA, getApplicationData, rejectApplication};