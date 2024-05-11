const db = require('../../database');

const mostBudgetMissions = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS MostBudgetMissions;
        
                        CREATE VIEW MostBudgetMissions AS
                        SELECT s.name, s.location, s.budget
                        FROM space_mission s
                        WHERE s.end_date >= CURDATE()
                        ORDER BY s.budget DESC;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful MostBudgetMissions view creation");
                resolve(result);
            }
        });
    });
};

const closestEndTimeMissions = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS ClosestEndTimeMissions;
        
                        CREATE VIEW ClosestEndTimeMissions AS
                        SELECT s.name, s.location, s.end_date
                        FROM space_mission s
                        WHERE s.end_date >= CURDATE()
                        ORDER BY s.end_date;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful ClosestEndTimeMissions view creation");
                resolve(result);
            }
        });
    });
};

const mostActiveMissionCompanies = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS MostActiveMissionCompanies;
        
                        CREATE VIEW MostActiveMissionCompanies AS
                        SELECT DISTINCT u.name, c.foundation_date, COUNT(s.mission_id) AS active_mission_count
                        FROM company c, user u, space_mission s
                        WHERE s.end_date >= CURDATE()
                        AND s.leading_firm_id = c.user_id
                        AND c.user_id = u.user_id
                        GROUP BY c.user_id
                        ORDER BY active_mission_count DESC;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful MostActiveMissionCompanies view creation");
                resolve(result);
            }
        });
    });
};

const mostPastMissionAstronauts = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS MostPastMissionAstronauts;
        
                        CREATE VIEW MostPastMissionAstronauts AS
                        SELECT u.name, c.foundation_date, COUNT(m.mission_id) AS past_mission_count
                        FROM astronaut a, user u, mission_of m
                        WHERE a.user_id = u.user_id
                        AND m.astronaut_id = a.user_id
                        AND m.leaving_date IS NOT NULL
                        GROUP BY a.user_id
                        ORDER BY past_mission_count DESC;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful MostPastMissionAstronauts view creation");
                resolve(result);
            }
        });
    });
};

const mostPartneredMissions = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS MostPartneredMissions;
        
                        CREATE VIEW MostPartneredMissions AS
                        SELECT DISTINCT s.*, COUNT(p.company_id) AS partner_count
                        FROM space_mission s, partner_firm p
                        WHERE s.mission_id = p.mission_id
                        AND s.end_date >= CURDATE()
                        GROUP BY p.mission_id
                        ORDER BY partner_count DESC;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful MostPartneredMissions view creation");
                resolve(result);
            }
        });
    });
};

const activeMissionDistributionOverCompanies = async () => {
    return new Promise((resolve, reject) => {

        const query = ` DROP VIEW IF EXISTS ActiveMissionDistributionOverCompanies;
        
                        CREATE VIEW ActiveMissionDistributionOverCompanies AS
                        SELECT DISTINCT c.user_id, (COUNT(s.mission_id) / ((SELECT COUNT(*) FROM space_mission WHERE end_date >= CURDATE()) + (SELECT COUNT(*) FROM space_mission s, partner_firm p WHERE s.end_date >= CURDATE() AND p.mission_id = s.mission_id))) * 100 AS ratio
                        FROM space_mission s, company c
                        WHERE (s.leading_firm_id = c.user_id OR EXISTS (SELECT * FROM partner_firm p WHERE p.company_id = c.user_id AND p.mission_id = s.mission_id))
                        AND s.end_date >= CURDATE()
                        GROUP BY c.user_id
                        ORDER BY ratio DESC;`;

        db.query(query, [], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                console.log(result, "successful ActiveMissionDistributionOverCompanies view creation");
                resolve(result);
            }
        });
    });
};

module.exports = {mostBudgetMissions, closestEndTimeMissions, mostActiveMissionCompanies ,mostPastMissionAstronauts, mostPartneredMissions, activeMissionDistributionOverCompanies};