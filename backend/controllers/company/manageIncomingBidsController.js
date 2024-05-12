const db = require('../../database');

const getIncomingBids = async (data) => {
    return new Promise((resolve, reject) => {
        const {missionId} = data;
        const query = ` SELECT DISTINCT b.*, c.*, u.name AS company_name
                        FROM mission_bid b, company c, user u
                        WHERE b.mission_id = ? AND b.bidding_company_id = c.user_id AND c.user_id = u.user_id
                        AND b.bid_status = 'In progress';`
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

const acceptIncomingBid = async (data) => {
    return new Promise((resolve, reject) => {
        const {companyId , bidId} = data;
        let query = ` SELECT DISTINCT * FROM mission_bid b
                        WHERE b.bid_id = ? AND b.bid_status <> 'In progress';`  // checks if the bid is still valid
        db.query(query,
                [bidId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.length === 0) {
                        query = `SELECT DISTINCT * FROM mission_bid b, company c
                                 WHERE c.user_id = ? AND b.bid_id = ? AND
                                 b.requested_amount <= c.balance`;
                        db.query(query,[companyId, bidId], (err, result) => {
                            if(err){
                                reject(err);
                            }
                            else if(result.length === 0){
                                reject("LEADING_COMPANY_BALANCE_NOT_ENOUGH");
                            }
                            else{
                                query = `UPDATE mission_bid b, company c1, company c2
                                         SET b.bid_status = 'Accepted',
                                         c1.balance = c1.balance + b.requested_amount,
                                         c2.balance = c2.balance - b.requested_amount
                                         WHERE b.bid_id = ?
                                         AND c1.user_id = b.bidding_company_id
                                         AND c2.user_id = ?;
                                         
                                         INSERT INTO partner_firm
                                         SELECT b.mission_id, b.bidding_company_id, CURDATE()
                                         FROM mission_bid b
                                         WHERE b.bid_id = ?;`
                                db.query(query, [bidId, companyId, bidId], (err,result) => {
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

module.exports = {getIncomingBids, acceptIncomingBid, rejectIncomingBid};