const express = require('express');
const router = express.Router();
const manageEmployeesController = require('../../controllers/company/manageEmployeesController');

//! Test
// Get employees with filters  

// Body: {companyId: int, searchedName: str, profession: str, minAge: int, maxAge: int
// sex: str, minWeight: int, maxWeight: int, minHeight: int, maxHeight: int, nationality: str}

router.get('/getEmployees', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }
        const response = await manageEmployeesController.getEmployees(req.query);
        res.status(200).send(response);
        console.log(response, "Test: get employees with filters");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No employees found with these filters");
        }
        else {
            res.status(400).send("An error occurred in get employees with filters: " + error);
        }
    }
});


//! Test
// Get employee data
// Body: {astronautId: int}
router.get('/getEmployeeData', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await manageEmployeesController.getEmployeeData(req.query);
        res.status(200).send(response);
        console.log(response, "Test: get employee data");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No employee found with this id");
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
        //! Test ~ When connected to frontend, delete this if block
        if(!req.body.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.body.companyId = companyId;
        }
        const response = await manageEmployeesController.fireEmployee(req.body);
        res.status(200).send(response);
        console.log(response, "Test: fire employee");
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No employee found working on the mission with this id");
        }
        else if (error === "LESS_THAN_6_MONTHS") {
            res.status(409).send("Can't fire the employee, employee started working in less than 6 months");
        }
        else {
            res.status(400).send("An error occurred in fire employee: " + error);
        }
    }
});


// Get mission names of company
// Body: {companyId: int}

router.get('/getMissionNames', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await manageEmployeesController.getCompanyMissionNames(req.query);
        res.status(200).send(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No missions found for this company");
        }
        else {
            res.status(400).send("An error occurred in get mission names: " + error);
        }
    }
});

// Get company professions
// Body: {companyId: int}

router.get('/getCompanyProfessions', async(req, res) => {
    try {
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await manageEmployeesController.getCompanyProfessions(req.query);
        res.status(200).send(response);
    } catch (error) {
        if(error=="ER_FIND_NONE"){
            res.status(204).send("No professions found for this company");
        }
        else{
            res.status(400).send("An error occurred in get company professions: " + error);
        }
    }
});

// Get company sex
// Body: {companyId: int}

router.get('/getCompanySex', async(req, res) => {
    try {
        
        //! Test ~ When connected to frontend, delete this if block
        if(!req.query.companyId){
            console.log("No companyId in query, using cookie");
            let companyId = req.cookies.companyId;
            req.query.companyId = companyId;
        }

        const response = await manageEmployeesController.getCompanySex(req.query);
        res.status(200).send(response);
    } catch (error) {
        if(error=="ER_FIND_NONE"){
            res.status(204).send("No sex found for this company");
        }
        else{
            res.status(400).send("An error occurred in get company sex: " + error);
        }
    }
});

module.exports = router;