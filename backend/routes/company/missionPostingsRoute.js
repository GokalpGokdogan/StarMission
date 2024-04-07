const express = require('express');
const router = express.Router();
const missionPostingsController = require('../../controllers/company/missionPostingsController');

//! Test ~ Delete this when tested
// Get mission postings with filters

// Body: { companyId: int, searchedName: str(255), startDate: date, endDate: date, location: str(255), 
// leadingCompanyName: str(255), minBudget: int, maxBudget: int }

router.get('/getMissionPostings', async (req, res) => {
    try {
        const data = req.query;
        const result = await missionPostingsController.getMissionPostings(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//! Test ~ Delete this when tested
// Get leading firm names
// use this for dropdown menu in frontend

router.get('/getLeadingFirmNames', async (req, res) => {
    try {
        const data = req.query;
        const result = await missionPostingsController.getLeadingFirmNames(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//! Test ~ Delete this when tested
// Get mission data
// use this for mission details page

router.get('/getMissionData', async (req, res) => {
    try {
        const data = req.query;
        const result = await missionPostingsController.getMissionData(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});


//! Test ~ Delete this when tested
// Bid To Mission
// Body: { companyId: int, missionId: int, amount: decimal(19,2), description: text }

router.post('/bidToMission', async (req, res) => {
    try {
        const data = req.body;
        const result = await missionPostingsController.bidToMission(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;