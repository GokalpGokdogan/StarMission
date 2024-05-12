const express = require('express');
const router = express.Router();
const missionPostingsController = require('../../controllers/company/missionPostingsController');

// Get mission postings with filters

// Body: { companyId: int, searchedName: str(255), startDate: date, endDate: date, location: str(255), 
// leadingCompanyName: str(255), minBudget: int, maxBudget: int }

router.get('/getMissionPostings', async (req, res) => {
    try {
        
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const data = req.query;
        const result = await missionPostingsController.getMissionPostings(data, 0);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Get past mission postings with filters

// Body: { companyId: int, searchedName: str(255), startDate: date, endDate: date, location: str(255),
// leadingCompanyName: str(255), minBudget: int, maxBudget: int }

// Body: { companyId: int, searchedName: str(255), startDate: date, endDate: date, location: str(255), 
// leadingCompanyName: str(255), minBudget: int, maxBudget: int }

router.get('/getPastMissionPostings', async (req, res) => {
    try {
        
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const data = req.query;
        const result = await missionPostingsController.getMissionPostings(data, 1);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});




// Get leading firm names
// use this for dropdown menu in frontend

router.get('/getLeadingFirmNames', async (req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }
        console.log(req.query);
        const data = req.query;
        const result = await missionPostingsController.getLeadingFirmNames(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});


// Get mission data
// use this for mission details page

router.get('/getMissionData', async (req, res) => {
    try {
        const data = req.query;
        const result = await missionPostingsController.getMissionData(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/getPartnerMissions', async (req, res) => {
    try {
        const data = req.query;
        const result = await missionPostingsController.getPartnerMissions(data);
        res.status(200).json(result);
    }
    catch (err) {
        if(err === "ER_FIND_NONE"){
            res.status(204).send("No partner missions found.");
        }
        else{
            res.status(400).send(err);
        }   
    }
});



// Bid To Mission
// Body: { companyId: int, missionId: int, amount: decimal(19,2), description: text }

router.post('/bidToMission', async (req, res) => {
    try {

        //! Test ~ When connected to frontend, delete this if block
        if(!req.body.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.body.companyId = companyId;
        }
        console.log(req.body);
        const data = req.body;
        const result = await missionPostingsController.bidToMission(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
 
module.exports = router;