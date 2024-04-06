const express = require('express');
const router = express.Router();

// Get all users

router.get('/getUsers', (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

module.exports = router;