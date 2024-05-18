const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/getImageById', async (req, res) => {
    try {
        const data = req.query;
        const result = await imageController.getImageById(data);
        res.status(200).json(result);
    }
    catch (err) {
        if (err == 'ER_FIND_NONE') {
            res.status(204).send("No users found");
        }
        else {
            res.status(400).send(err);
        }
    }
});

router.get('/getImageByName', async (req, res) => {
    try {
        const data = req.query;
        const result = await imageController.getImageByName(data);
        res.status(200).json(result);
    }
    catch (err) {
        if (err == 'ER_FIND_NONE') {
            res.status(204).send("No users found");
        }
        else {
            res.status(400).send(err);
        }
    }
});

module.exports = router;