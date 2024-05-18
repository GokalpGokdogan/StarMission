const express = require('express');
const router = express.Router();
const { getAstronautData, editProfile} = require('../../controllers/astronaut/profileController');

// Get astronaut data
// Body: {astronautId: int}

router.get('/getAstronautData', async (req, res) => {
    try {
        const data = req.query;
        const result = await getAstronautData(data);
        res.status(200).json(result);
    }
    catch (err) {
        if (err == 'ER_FIND_NONE') {
            res.status(204).send("No companies found");
        }
        else {
            res.status(400).send(err);
        }
    }
});

//! Experimental
// Edit astronaut profile
// Body: {astronautId, name, email, phone, password, address, birth_date,
// weight, height, description, sex, profession, nationality}

router.post('/editProfile', async (req, res) => {
    try {
        const data = req.body;
        await editProfile(data);
        res.status(200).send("Astronaut profile updated.");
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;