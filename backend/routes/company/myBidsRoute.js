const express = require('express');
const router = express.Router();
const {getMyBids} = require('../../controllers/company/myBidsController');

router.get('/getMyBids', async (req, res) => {
    try {
        const data = req.query;
        const result = await getMyBids(data);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;