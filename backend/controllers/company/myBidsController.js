const db = require('../../database');

const getMyBids = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { companyId, missionId } = data;
        let query = `SELECT DISTINCT b.*, s.name FROM mission_bid b, space_mission s 
                    WHERE s.mission_id = b.mission_id AND b.bidding_company_id = ? 
                    AND (CASE WHEN ? IS NOT NULL THEN s.mission_id = ? ELSE 1 END)
                    ORDER BY b.bid_date DESC;`;
        db.query(query, [companyId, missionId], (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No bids found for this company
                }
                else {
                    resolve(result);
                }
            }
        );
    });
};

const getBiddingCompanies = async (data) => {
    return new Promise((resolve, reject) => {
        const { missionId } = data;
        // Query to fetch bidding companies based on missionId
        let query = `SELECT DISTINCT * FROM user u, mission_bid b
                    WHERE u.user_id = b.bidding_company_id AND b.mission_id = ? ORDER BY b.bid_date DESC;`;
        db.query(query, [missionId], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length === 0) {
                console.log(result)
                reject("No bidding companies found for this mission");
                
            } else {
                console.log(result)
                resolve(result);
                
            }
        });
    });
};

module.exports = { getMyBids, getBiddingCompanies };