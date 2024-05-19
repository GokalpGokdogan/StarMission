const express = require('express');
const router = express.Router();
const {createMission} = require('../../controllers/company/createMissionController');

/* Request Body:
    {   companyId: int,
        name: varchar(255),
        location: varchar(255),
        start_date: date,
        end_date: date,
        description: text,
        budget: float,
        important_notes: text
    }
*/

router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const response = await createMission(data);
        res.status(200).send(response);
    } catch (error) {
        if(error == "MISSION NAME IS ALREADY TAKEN"){
            res.status(409).send("MISSION NAME IS ALREADY TAKEN");
        }
        else if(error == "MISSION BUDGET EXCEEDS BALANCE"){
            res.status(401).send("MISSION BUDGET EXCEEDS BALANCE");
        }
        else{
            res.status(400).send("An error occured while creating mission: "+ error);
        }
    }
});

module.exports = router;