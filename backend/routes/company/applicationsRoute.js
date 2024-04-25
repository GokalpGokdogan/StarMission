const express = require('express');
const router = express.Router();
const applicationsController = require('../../controllers/company/applicationsController');


// Get applications with filters
// Body: {companyId: int, searchedName: str, profession: str, minAge: int, maxAge: int,
// sex: str, minWeight: int, maxWeight: int, minHeight: int, maxHeight: int, nationality: str, missionName: str}
// Required: companyId

router.get('/getApplications', async(req, res) => {
    try {
        
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }
        
        const response = await applicationsController.getApplications(req.query);
        console.log(response, "Test: get applications with filters");
        res.status(200).send(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No applications found with these filters");
        }
        else {
            res.status(400).send("An error occurred in get applications with filters: " + error);
        }
    }
});


// Get applicant data
// Body: {applicantId: int}

router.get('/getApplicantData', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await applicationsController.getApplicantData(req.query);
        console.log(response, "Test: get applicant data");
        res.status(200).send(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No applicant found with this id");
        }
        else {
            res.status(400).send("An error occurred in get applicant data: " + error);
        }
    }
});





// Accept application (company decides on salary and date)
//! This request fits current infrastructure, but it is not the best way to implement this feature.
// Body: {astronautId: int, missionId: int, salary: int, startDate: date}


router.post('/acceptApplicationC', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.body.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.body.companyId = companyId;
        }
        const response = await applicationsController.acceptApplicationC(req.body);
        // console.log(response, "Test: accept application");
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in accept application: " + error);
    }
});







//! This request does not fit current infrastructure, but it is the best way to implement this feature.
//! Test ~ Delete this when tested
// Accept application (Astronaut decides on salary and date)
// Note: salary and start date will be passed by getApplicationData request
// Body: {astronautId: int, missionId: int, salary: int, startDate: date}

router.post('/acceptApplicationA', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.body.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.body.companyId = companyId;
        }

        const response = await applicationsController.acceptApplicationA(req.body);
        console.log(response, "Test: accept application");
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in accept application: " + error);
    }
});







// Get application data
// Body: {astronautId: int, missionId: int}

router.get('/getApplicationData', async(req, res) => {
    try {

        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await applicationsController.getApplicationData(req.query);
        res.status(200).send(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No application found with this id");
        }
        else {
            res.status(400).send("An error occurred in get application data: " + error);
        }
    }
});


// Reject application
// Body: {astronautId: int, missionId: int}

router.post('/rejectApplication', async(req, res) => {
    try {

        //! Test ~ When connected to frontend, delete this if block
        if(!req.body.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.body.companyId = companyId;
        }

        const response = await applicationsController.rejectApplication(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in reject application: " + error);
    }
});

module.exports = router;