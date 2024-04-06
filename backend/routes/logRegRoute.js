const express = require('express');
const router = express.Router();
const logResController = require('../controllers/logRegController');


// Register Astronaut
router.post('/registerAstronaut', async(req, res) => {

    // get user data
    try {
        const response = await logResController.registerAstronaut(req.body);
        res.status(200).send(response);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send("ERROR_EMAIL_EXISTS");
        } else {
            res.status(400).send("An error occurred: "+ error);
        }
    }
    
});

// Register Company
router.post('/registerCompany', async(req, res) => {

    // get user data
    try {
        const response = await logResController.registerCompany(req.body);
        res.status(200).send(response);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send("ERROR_EMAIL_EXISTS");
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