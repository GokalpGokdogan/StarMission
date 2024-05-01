const express = require('express');
const router = express.Router();
const createViewsController = require("../../controllers/admin/createViewsController.js");

router.post('/', async(req, res) => {
    try {
        const astronaut_id = req.cookies.user_id;
        const user_type = req.cookies.user_type;

        if(astronaut_id && user_type == "admin"){
            const response = await createViewsController.mostSalaryAstronauts(req.body);
            res.status(200).json(response);
        }
        else{
            res.status(401).send("NOT_AUTHORIZED_USER");
        }
    } catch (error) {
            res.status(400).send("Create Views Error: " + error);
    }
});

module.exports = router;