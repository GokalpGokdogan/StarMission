const express = require('express');
const router = express.Router();
const { getCompanyData } = require('../../controllers/company/profileController');

// Get company data
// Body: {companyId: int}

router.get('/getCompanyData', async (req, res) => {
    try {
        const data = req.query;
        const result = await getCompanyData(data);
        res.status(200).json(result);
    }
    catch (err) {
        if (err == 'ER_FIND_NONE') {
            res.status(204).send("No companies found");
        }
        else {
            res.status(400).send(err);
        }
    }
});

module.exports = router;