const db = require('../../database');

const getCurrentMission = async (astronaut_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM mission_of WHERE astronaut_id = ? AND leaving_date IS NULL;";
        db.query(query, [astronaut_id], (err, result) => {
            if(err){
                reject(err);
            }
            else if(result.length === 0){
                reject("ER_FIND_NONE");
            }
            else{
                console.log(result, "successful current mission data");
                resolve(result);
            }
        });
    });
};

module.exports = {getCurrentMission};