const db = require('../../database');

const getAstronautData = async (data) => {
    return new Promise((resolve, reject) => {
        
        const { astronautId } = data;
        let query = `SELECT * from astronaut a, user u WHERE a.user_id = u.user_id AND u.user_id = ?;`;
        db.query(query, [astronautId], (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    reject("ER_FIND_NONE");     // No companies found for this id
                }
                else {
                    resolve(result[0]);
                }
            }
        );
    });
};


const editProfile = async (data) => {
    return new Promise((resolve, reject) => {

        const { astronautId, name, email, phone, password, address, birth_date,
             weight, height, description, sex, profession, nationality} = data;
        
        let query = ``;
        if(name){
            query += `UPDATE user SET name = '${name}' WHERE user_id = ${astronautId};`;
        }

        if(email){
            query += `UPDATE user SET email = '${email}' WHERE user_id = ${astronautId};`;
        }

        if(phone){
            query += `UPDATE user SET phone = '${phone}' WHERE user_id = ${astronautId};`;
        }

        if(password){
            query += `UPDATE user SET password = '${password}' WHERE user_id = ${astronautId};`;
        }

        if(description){
            query += `UPDATE astronaut SET description = '${description}' WHERE user_id = ${astronautId};`;
        }

        if(address){
            query += `UPDATE astronaut SET address = '${address}' WHERE user_id = ${astronautId};`;
        }

        if(birth_date){
            query += `UPDATE astronaut SET birth_date = '${birth_date}' WHERE user_id = ${astronautId};`;
        }

        if(weight){
            query += `UPDATE astronaut SET weight = ${weight} WHERE user_id = ${astronautId};`;
        }

        if(height){
            query += `UPDATE astronaut SET height = ${height} WHERE user_id = ${astronautId};`;
        }

        if(sex){
            query += `UPDATE astronaut SET sex = '${sex}' WHERE user_id = ${astronautId};`;
        }

        if(profession){
            query += `UPDATE astronaut SET profession = '${profession}' WHERE user_id = ${astronautId};`;
        }

        if(nationality){
            query += `UPDATE astronaut SET nationality = '${nationality}' WHERE user_id = ${astronautId};`;
        }


        db.query(query, [], (err, result) => {
            console.log(data);
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports = { getAstronautData, editProfile };