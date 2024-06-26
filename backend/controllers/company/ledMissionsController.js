const db = require('../../database');

const getLedMissions = async (data) => {
    return new Promise((resolve, reject) => {
        
    let { companyId , name, start_date, end_date, location, min_budget, max_budget} = data;
    if(name){name = "%"+name+"%";}
    if(location){location = "%"+location+"%";}
    name = name || null;
    let query = `SELECT DISTINCT * FROM space_mission s
                WHERE s.leading_firm_id = ? AND s.end_date > CURDATE()
                AND (CASE WHEN ? IS NOT NULL THEN s.name LIKE ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN s.start_date >= ? ELSE 1 END) 
                AND (CASE WHEN ? IS NOT NULL THEN s.end_date <= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN s.location LIKE ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN s.budget >= ? ELSE 1 END)
                AND (CASE WHEN ? IS NOT NULL THEN s.budget <= ? ELSE 1 END)
                ORDER BY s.end_date;`;
        db.query(query, [companyId, name, name, start_date, start_date, end_date, end_date, location, location, min_budget, min_budget, max_budget, max_budget], (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No mission postings found with the company has no leading.
                }
                else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports = {getLedMissions};