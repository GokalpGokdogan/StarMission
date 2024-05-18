const express = require('express');
const router = express.Router();
const { getAdminData, editProfile} = require('../../controllers/admin/profileController');

// Get admin data
// Body: {adminId: int}

router.get('/getAdminData', async (req, res) => {
    try {
        const data = req.query;
        const result = await getAdminData(data);
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
// Edit admin profile
// Body: {adminId, name, email, phone, password, address, birth_date,
// weight, height, description, sex, profession, nationality}

router.post('/editProfile', async (req, res) => {
    try {
        const data = req.body;
        await editProfile(data);
        res.status(200).send("Admin profile updated.");
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;