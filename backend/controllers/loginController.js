const db = require("../database.js");

const register = async function(data){
    let sql = 'INSERT INTO user VALUES ()';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
};