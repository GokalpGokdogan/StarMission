const express = require('express');
const router = express.Router();
const applicationsController = require('../../controllers/company/applicationsController');

//! Test
// Get applications with filters
// Body: {companyId: int, searchedName: str, profession: str, minAge: int, maxAge: int,
// sex: str, minWeight: int, maxWeight: int, minHeight: int, maxHeight: int, nationality: str, missionName: str}

router.get('/getApplications', async(req, res) => {
    try {
        const response = await applicationsController.getApplications(req.body);
        res.status(200).send(response);
        console.log(response, "Test: get applications with filters");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No applications found with these filters");
        }
        else {
            res.status(400).send("An error occurred in get applications with filters: " + error);
        }
    }
});

//! Test
// Get applicant data
// Body: {applicantId: int}

router.get('/getApplicantData', async(req, res) => {
    try {
        const response = await applicationsController.getApplicantData(req.body);
        res.status(200).send(response);
        console.log(response, "Test: get applicant data");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No applicant found with this id");
        }
        else {
            res.status(400).send("An error occurred in get applicant data: " + error);
        }
    }
});


