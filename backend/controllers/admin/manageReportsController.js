const db = require('../../database');

let optionList = ["MostBudgetMissions", "ClosestEndTimeMissions", "MostActiveMissionCompanies",
    "MostPastMissionAstronauts", "MostPartneredMissions", "ActiveMissionDistributionOverCompanies"];

const getAllReports = async (data) => {
    return new Promise((resolve, reject) => {
        const { adminId } = data;

        let query = `SELECT * FROM report r WHERE r.admin_id = ? ORDER BY creation_date DESC;`;
        db.query(query, [adminId], async (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};

const getReportData = async (data) => {
    return new Promise((resolve, reject) => {
        const { reportId } = data;
        let resultObj = {};

        let query = `SELECT * FROM report r WHERE r.report_id = ?;`;
        db.query(query, [reportId], async (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resultObj.report_name = result[0].name;
                resultObj.description = result[0].description;
                resultObj.creation_date = result[0].creation_date;

                query = `SELECT t.*, c.name as container_name FROM container c, tableForm t
                         WHERE c.container_id = t.container_id
                         AND c.report_id = ?`;

                db.query(query, [reportId], async (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resultObj.containers = [];
                        await result.forEach(container => {
                            let containerObj = {};

                            containerObj.container_name = container.container_name;
                            containerObj.column1 = container.c_name1;
                            containerObj.column2 = container.c_name2;
                            containerObj.column3 = container.c_name3;

                            containerObj.column1Data = container.c_data1.split("$$$$");
                            containerObj.column2Data = container.c_data2.split("$$$$");
                            containerObj.column3Data = container.c_data3.split("$$$$");

                            resultObj.containers.push(containerObj);
                        });
                        resolve(resultObj);
                    }
                });
            }
        });
    });
};

const deleteReport = async(data) => {
    return new Promise((resolve, reject) => {
        const { reportId } = data;

        let query = `DELETE FROM tableForm WHERE report_id = ?;
                     DELETE FROM container WHERE report_id = ?;
                     DELETE FROM report WHERE report_id = ?;`;

        db.query(query, [reportId,reportId,reportId], async (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
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

                    query = `SELECT * FROM ${optionList[option]};`;     // view usage
                    await db.query(query, [], async (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            let col1, col2, col3, col1Data = "", col2Data = "", col3Data = "";
                            if (option == 0) {        // MostBudgetMissions
                                col1 = "Name";
                                col2 = "Location";
                                col3 = "Budget";

                                await result.forEach(row => {
                                    col1Data += row.name + "$$$$";
                                    col2Data += row.location + "$$$$";
                                    col3Data += row.budget + "$$$$";
                                });
                            }

                            if (option == 1) {        // ClosestEndTimeMissions
                                col1 = "Name";
                                col2 = "Location";
                                col3 = "End Date";

                                await result.forEach(row => {
                                    col1Data += row.name + "$$$$";
                                    col2Data += row.location + "$$$$";
                                    col3Data += row.end_date + "$$$$";
                                });
                            }

                            if (option == 2) {        // MostActiveMissionCompanies
                                col1 = "Name";
                                col2 = "Foundation Date";
                                col3 = "Active Mission Count";

                                await result.forEach(row => {
                                    col1Data += row.name + "$$$$";
                                    col2Data += row.foundation_date + "$$$$";
                                    col3Data += row.active_mission_count + "$$$$";
                                });
                            }

                            if (option == 3) {        // MostPastMissionAstronauts
                                col1 = "Name";
                                col2 = "Profession";
                                col3 = "Past Mission Count";

                                await result.forEach(row => {
                                    col1Data += row.name + "$$$$";
                                    col2Data += row.profession + "$$$$";
                                    col3Data += row.past_mission_count + "$$$$";
                                });
                            }

                            if (option == 4) {        // MostPartneredMissions
                                col1 = "Name";
                                col2 = "Location";
                                col3 = "Partner Count";

                                await result.forEach(row => {
                                    col1Data += row.name + "$$$$";
                                    col2Data += row.location + "$$$$";
                                    col3Data += row.partner_count + "$$$$";
                                });
                            }
                            query = `   INSERT INTO container(report_id, name)
                                        VALUES (?, ?)`;
                            let today = new Date();
                            await db.query(query, [reportId, optionList[option] + " - " + today.getDate() + "/" + today.getMonth() + 1 + "/" + today.getFullYear()], async (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    const containerId = result.insertId;

                                    if (option != 5) {
                                        query = `   INSERT INTO tableForm(container_id, report_id, c_name1, c_name2, c_name3, c_data1, c_data2, c_data3)
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
                                        await db.query(query, [containerId, reportId, col1, col2, col3, col1Data, col2Data, col3Data], (err, result) => {
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

module.exports = { createReport, getAllReports , getReportData, deleteReport};