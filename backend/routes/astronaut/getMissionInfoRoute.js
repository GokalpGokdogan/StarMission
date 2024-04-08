const express = require('express');
const router = express.Router();
const { getCurrentMission } = require("../../controllers/astronaut/getMissionInfoController.js");

router.get('/getCurrentMission', async(req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        if(astronaut_id && user_type == "astronaut"){
            const response = await getCurrentMission(astronaut_id);
            res.status(200).send(response);
            console.log(response, "Test: get applications with filters");
        }
        else{
            res.status(400).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No current missions available for this astronaut");
        }
        else {
            res.status(400).send("An error occurred in get current missions for astronaut" + error);
        }
    }
});

module.exports = router;