const express = require('express');
const db = require('../database');
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

//ABLALAR O ZAMAN BUNDAN SONRA GET YAPARKENE BEN SİZE PARAMS'TAN GÖNDERECEM O YÜZDEN BODY DİİL QUERY'DEN ÇEKECENİZ SAYGILAR <3333

router.get('/login', async(req, res) => {
    try{
        const response = await logResController.login(req.query);
        let id = response[0].user_id;
        const user_type = await logResController.getUserType(id);
        
        // delete all cookies
        const cookieNames = Object.keys(req.cookies);
        cookieNames.forEach(cookieName => {
            res.clearCookie(cookieName);
        });
        
        res.cookie('user_type', user_type);
        res.cookie('user_id', id);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred: " + error);
    }
});

module.exports = router;