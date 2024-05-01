const db = require('../../database');

const getMyBids = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { companyId } = data;
        let query = `SELECT DISTINCT b.*, s.name FROM mission_bid b, space_mission s 
                    WHERE s.mission_id = b.mission_id AND b.bidding_company_id = ? ORDER BY b.bid_date DESC;`;
        db.query(query, [companyId], (err, result) => {
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

module.exports = {getMyBids};