const express = require('express');
const router = express.Router();
const {createReport, getAllReports, getReportData, deleteReport} = require('../../controllers/admin/manageReportsController');

router.post('/createReport', async(req, res) => {
    try {
        
        const response = await createReport(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in create report: " + error);
    }
});

router.delete('/deleteReport', async(req, res) => {
    try {
        const response = await deleteReport(req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in delete report: " + error);
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

router.get('/getReportData', async(req, res) => {
    try {
        const response = await getReportData(req.query);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in get applications with filters: " + error);
    }
});

module.exports = router;