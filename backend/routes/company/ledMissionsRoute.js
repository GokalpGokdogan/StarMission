const express = require('express');
const router = express.Router();
const {getLedMissions} = require('../../controllers/company/ledMissionsController');

router.get('/getLedMissions', async (req, res) => {
    try {
        const data = req.query;
        console.log(data);
        const result = await getLedMissions(data);
        res.status(200).json(result);
    }
    catch (err) {
        if(err === "ER_FIND_NONE") {
            res.status(204).send("No missions found with these filters");
        }
        else{
            res.status(400).send(err);
        }
    }
});

module.exports = router;