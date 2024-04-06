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
        res.cookie('user_id', req.query.email);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred: " + error);
    }
});

module.exports = router;