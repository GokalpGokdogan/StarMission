const db = require('../../database');

optionList = ["MostBudgetMissions", "ClosestEndTimeMissions", "MostActiveMissionCompanies",
    "MostPastMissionAstronauts", "MostPartneredMissions", "ActiveMissionDistributionOverCompanies"]

const createReport = async (adminId, data) => {
    return new Promise((resolve, reject) => {

        const { admin,description, name, optionIndexList } = data;

        let query = ` INSERT INTO report(creation_date, description, admin_id, name)
                        VALUES (CURDATE(), ?, ?, ?);`;
        db.query(query, [description, admin, name], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                optionIndexList.forEach(option => {

                    let query = `SELECT * FROM ?`;     // view usage
                    db.query(query, [optionList[option]], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                })
            }
        });
    });
};