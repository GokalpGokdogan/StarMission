const express = require('express');
const db = require('../database');
const router = express.Router();
const logResController = require('../controllers/logRegController');

// Get all users

router.get('/getUsers', (req, res) => {
    
});

router.get('/sign-up', (req, res) => {
    res.send("Whaduuuuo");
});

// Register
router.post('/register', async(req, res) => {

    // get user data
    try {
        const response = await logResController.register(req.body);
        res.status(200).send(response);
        console.log(response, "response test 1");
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log("Email already exists");
            res.status(400).send("Email already exists");
        } else {
            res.status(400).send("An error occurred: "+ error);
        }
    }
    
    
});

router.get('/login', async(req, res) => {
    try{
        const response = await logResController.login(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred: " + error);
    }
});

module.exports = router;