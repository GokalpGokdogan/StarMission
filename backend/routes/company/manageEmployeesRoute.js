const express = require('express');
const router = express.Router();
const manageEmployeesController = require('../../controllers/company/manageEmployeesController');

//! Test
// Get employees with filters  
router.get('/getEmployees', async(req, res) => {
    try {
        const response = await manageEmployeesController.getEmployees(req.body);
        res.status(200).send(response);
        console.log(response, "Test: get employees with filters");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No employees found with these filters");
        }
        else {
            res.status(400).send("An error occurred in get employees with filters: " + error);
        }
    }
});

module.exports = router;