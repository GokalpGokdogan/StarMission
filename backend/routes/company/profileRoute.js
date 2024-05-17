const express = require('express');
const router = express.Router();
const { getCompanyData } = require('../../controllers/company/profileController');

// Get company data
// Body: {companyId: int}

router.get('/getCompanyData', async (req, res) => {
    try {
        const data = req.query;
        const result = await getCompanyData(data);
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
// Edit company profile
// Body: {companyId: int, name: string, email: string, phone: string, 
// password: string, foundation_date: string, description: string, balance: int}

router.post('/editProfile', async (req, res) => {
    try {
        const data = req.body;
        await editProfile(data.companyId, data);
        res.status(200).send("Company profile updated.");
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;