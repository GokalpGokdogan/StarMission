const db = require('../../database');

const getIncomingBids = async (data) => {
    return new Promise((resolve, reject) => {
        const {missionId} = data;
        const query = ` SELECT DISTINCT b.*, u.name AS company_name
                        FROM mission_bid b, company c, user u, space_mission s 
                        WHERE b.mission_id = ? AND b.bidding_company_id = c.user_id AND c.user_id = u.user_id
                        AND b.bid_status = 'In progress'
                        AND s.mission_id = b.mission_id AND s.start_date > CURDATE();`
        db.query(query,
                [missionId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        reject("ER_FIND_NONE");     // No bids found for this mission
                    }
                    else {
                        console.log(result, "successful get bids on a mission");
                        resolve(result);
                    }
                }
        );
    });
}

const getBidData = async (data) => {
    return new Promise((resolve, reject) => {
        const {bidId} = data;
        const query = ` SELECT DISTINCT b.*, u.name AS company_name, s.name as mission_name
                        FROM mission_bid b, user u, space_mission s
                        WHERE b.bid_id = ? AND b.bidding_company_id = u.user_id
                        AND b.mission_id = s.mission_id;`
        db.query(query,
                [bidId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        reject("ER_FIND_NONE");     // No bids found for this mission
                    }
                    else {
                        console.log(result, "successful get bids on a mission");
                        resolve(result[0]);
                    }
                }
        );
    });
}

const acceptIncomingBid = async (data) => {
    return new Promise((resolve, reject) => {
        const {companyId , bidId} = data;
        let query = ` SELECT DISTINCT * FROM mission_bid b
                        WHERE b.bid_id = ? AND b.bid_status = 'In progress';`  // checks if the bid is still valid
        db.query(query,
                [bidId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length != 0) {
                        query = `SELECT DISTINCT *, s.name as mission_name, u.name as bidding_company_name FROM mission_bid b, user u, company c, space_mission s
                                 WHERE u.user_id = ? AND b.bid_id = ? AND u.user_id = c.user_id AND s.mission_id = b.mission_id AND
                                 b.requested_amount <= s.budget`;
                        db.query(query,[companyId, bidId], (err, result) => {
                            if(err){
                                reject(err);
                            }
                            else if(result.length === 0){
                                reject("LEADING_COMPANY_BALANCE_NOT_ENOUGH");
                            }
                            else{

                                query = `UPDATE mission_bid b, company c1, space_mission s
                                         SET b.bid_status = 'Accepted',
                                         c1.balance = c1.balance + b.requested_amount,
                                         s.budget = s.budget - b.requested_amount
                                         WHERE b.bid_id = ?
                                         AND c1.user_id = b.bidding_company_id
                                         AND s.mission_id = b.mission_id;
                                         
                                         INSERT INTO partner_firm
                                         SELECT b.mission_id, b.bidding_company_id, CURDATE()
                                         FROM mission_bid b
                                         WHERE b.bid_id = ?;`

                                db.query(query, [bidId, bidId], (err,result) => {
                                    if(err){
                                        reject(err);
                                    }
                                    else{
                                        console.log("Succesfull accept bid process.");
                                        resolve(result);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        reject("INVALID_BID");     // No bids found for this mission
                    }
                }
        );
    });
}

const rejectIncomingBid = async(data) => {
    return new Promise((resolve, reject) => {
        const {bidId} = data;
        const query = ` UPDATE mission_bid b
                        SET b.bid_status = 'Rejected'
                        WHERE b.bid_id = ?;`
        db.query(query,
                [bidId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log(result, "successful reject bid process");
                        resolve(result);
                    }
                }
        );
    });
};

module.exports = {getIncomingBids, acceptIncomingBid, rejectIncomingBid, getBidData};