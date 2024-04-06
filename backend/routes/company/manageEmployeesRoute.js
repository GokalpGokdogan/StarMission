const express = require('express');
const router = express.Router();
const manageEmployeesController = require('../../controllers/company/manageEmployeesController');

//! Test
// Get employees with filters  

// Body: {companyId: int, searchedName: str, profession: str, minAge: int, maxAge: int
// sex: str, minWeight: int, maxWeight: int, minHeight: int, maxHeight: int, nationality: str}

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


//! Test
// Get employee data
// Body: {employeeId: int}
router.get('/getEmployeeData', async(req, res) => {
    try {
        const response = await manageEmployeesController.getEmployeeData(req.body);
        res.status(200).send(response);
        console.log(response, "Test: get employee data");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No employee found with this id");
        }
        else {
            res.status(400).send("An error occurred in get employee data: " + error);
        }
    }
});

//! Test
// Fire employee
// Body: {employee_id: int, mission_id: int}
router.post('/fireEmployee', async(req, res) => {
    try {
        const response = await manageEmployeesController.fireEmployee(req.body);
        res.status(200).send(response);
        console.log(response, "Test: fire employee");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(400).send("No employee found working on the mission with this id");
        }
        else {
            res.status(400).send("An error occurred in fire employee: " + error);
        }
    }
});

module.exports = router;