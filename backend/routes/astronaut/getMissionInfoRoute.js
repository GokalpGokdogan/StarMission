const express = require('express');
const router = express.Router();
const { getCurrentMission, getPastMissions, getRecentMissions, getCurrentMissionExtract } = require("../../controllers/astronaut/getMissionInfoController.js");

router.get('/getCurrentMissionExtract', async (req, res) => {
    try {
        const astronaut_id = req.query.astronautId;
        const response = await getCurrentMissionExtract(astronaut_id);
        res.status(200).json(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No current missions available for this astronaut");
        }
        else {
            res.status(400).send("An error occurred in get current missions for astronaut" + error);
        }
    }
});

router.get('/getCurrentMission', async (req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        if (astronaut_id && user_type == "astronaut") {
            const response = await getCurrentMission(astronaut_id);
            res.status(200).json(response);
        }
        else {
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No current missions available for this astronaut");
        }
        else {
            res.status(400).send("An error occurred in get current missions for astronaut" + error);
        }
    }
});

router.get('/getPastMissions', async (req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        if (astronaut_id && user_type == "astronaut") {
            const response = await getPastMissions(astronaut_id);
            res.status(200).json(response);
        }
        else {
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("ER_FIND_NONE");
        }
        else {
            res.status(400).send("An error occurred in get past missions for astronaut" + error);
        }
    }
});

router.get('/getRecentMissions', async (req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        const data = req.query;

        if (astronaut_id && user_type == "astronaut") {
            const response = await getRecentMissions(astronaut_id, data);
            res.status(200).json(response);
        }
        else {
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No recent mission postings");
        }
        else {
            res.status(400).send("An error occurred in get recent mission postings for astronaut" + error);
        }
    }
});

module.exports = router;