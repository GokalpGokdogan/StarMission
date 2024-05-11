const db = require('../../database');

optionList = ["MostBudgetMissions", "ClosestEndTimeMissions", "MostActiveMissionCompanies",
    "MostPastMissionAstronauts", "MostPartneredMissions", "ActiveMissionDistributionOverCompanies"]

const optionFormer = (result, col1, col2, col3, col1Data, col2Data, col3Data) => {

    if (option == 1) {        // MostBudgetMissions
        col1 = "Name";
        col2 = "Location";
        col3 = "Budget";

        result.forEach(row => {
            col1Data += row.name + "$$$$";
            col2Data += row.location + "$$$$";
            col3Data += row.budget + "$$$$";
        });
    }

    if (option == 2) {        // ClosestEndTimeMissions
        col1 = "Name";
        col2 = "Location";
        col3 = "End Date";

        result.forEach(row => {
            col1Data += row.name + "$$$$";
            col2Data += row.location + "$$$$";
            col3Data += row.end_date + "$$$$";
        });
    }

    if (option == 3) {        // MostActiveMissionCompanies
        col1 = "Name";
        col2 = "Foundation Date";
        col3 = "Active Mission Count";

        result.forEach(row => {
            col1Data += row.name + "$$$$";
            col2Data += row.foundation_date + "$$$$";
            col3Data += row.active_mission_count + "$$$$";
        });
    }

    if (option == 4) {        // MostPastMissionAstronauts
        col1 = "Name";
        col2 = "Foundation Date";
        col3 = "Past Mission Count";

        result.forEach(row => {
            col1Data += row.name + "$$$$";
            col2Data += row.foundation_date + "$$$$";
            col3Data += row.past_mission_count + "$$$$";
        });
    }

    if (option == 5) {        // MostPartneredMissions
        col1 = "Name";
        col2 = "Location";
        col3 = "Partner Count";

        result.forEach(row => {
            col1Data += row.name + "$$$$";
            col2Data += row.location + "$$$$";
            col3Data += row.partner_count + "$$$$";
        });
    }
};

const createReport = async (data) => {
    return new Promise((resolve, reject) => {

        const { admin, description, name, optionIndexList } = data;
        let query = ` INSERT INTO report(creation_date, description, admin_id, name)
                        VALUES (CURDATE(), ?, ?, ?);`;
        db.query(query, [description, admin, name], async (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const reportId = result.insertId;   // report id
                await optionIndexList.forEach(async option => {

                    query = `SELECT * FROM ?`;     // view usage
                    await db.query(query, [optionList[option]], async (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            let col1, col2, col3, col1Data, col2Data, col3Data;
                            optionFormer(result, col1, col2, col3, col1Data, col2Data, col3Data);   // filling up data

                            query = `   INSERT INTO container(report_id, name)
                                        VALUES (?, ?)`;
                            await db.query(query, [reportId, optionList[option] + "in " + new Date()], async (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    const containerId = result.insertId;

                                    if (option != 5) {
                                        query = `   INSERT INTO table(container_id, c_name1, c_name2, c_name3, c_data1, c_data2, c_data3)
                                                VALUES (?, ?, ?, ?, ?, ?, ?);`;

                                        await db.query(query, [containerId, col1, col2, col3, col1Data, col2Data, col3Data], (err, result) => {
                                            if (err) {
                                                reject(err);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
                resolve(result);
            }
        });
    });
};

module.exports = {createReport};