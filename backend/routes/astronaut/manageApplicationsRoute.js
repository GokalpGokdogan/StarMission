const express = require('express');
const router = express.Router();
const { applyToMission, getApplications} = require("../../controllers/astronaut/manageApplicationsController.js");

router.get('/getApplications', async(req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        const data = req.query;

        if(astronaut_id && user_type == "astronaut"){
            const response = await getApplications(astronaut_id, data);
            res.status(200).json(response);
        }
        else{
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
            res.status(400).send("An error occurred in get current missions for astronaut" + error);
    }
});

router.post('/applyToMission', async(req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        const data = req.body;

        if(astronaut_id && user_type == "astronaut"){
            const response = await applyToMission(astronaut_id, data);
            res.status(200).json(response);
        }
        else{
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
        if(error === "ALREADY_AVAILABLE_APPLICATION"){
            res.status(409).send("Application is already made and in progress.");
        }
        else{
            res.status(400).send("An error occurred in get recent mission postings for astronaut" + error);
        }
    }
});

module.exports = router;