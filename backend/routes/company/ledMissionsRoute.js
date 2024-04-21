const express = require('express');
const router = express.Router();
const {getLedMissions} = require('../../controllers/company/ledMissionsController');

router.get('/getLedMissions', async (req, res) => {
    try {
        const data = req.query;
        const result = await getLedMissions(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;