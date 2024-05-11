const express = require('express');
const router = express.Router();
const {createReport, getAllReports} = require('../../controllers/admin/manageReportsController');

router.post('/createReport', async(req, res) => {
    try {
        
        const response = await createReport(req.body);
        console.log(response, "Test: get applications with filters");
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in get applications with filters: " + error);
    }
});

router.get('/getAllReports', async(req, res) => {
    try {
        const response = await getAllReports(req.query);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in get applications with filters: " + error);
    }
});



module.exports = router;