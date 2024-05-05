const express = require('express');
const router = express.Router();
const manageIncomingBidsController = require('../../controllers/company/manageIncomingBidsController');

// Body: {missionId: int}

router.get('/getIncomingBids', async(req, res) => {
    try {

        const response = await manageIncomingBidsController.getIncomingBids(req.query);
        res.status(200).send(response);
    } catch (error) {
        if (error === "ER_FIND_NONE") {
            res.status(204).send("No bids found for the mission");
        }
        else {
            res.status(400).send("An error occurred in get bids on a mission: " + error);
        }
    }
});


// Body: {companyId: int , bidId: int}
// companyId is the leading company ID of the mission
router.post('/acceptIncomingBid', async(req,res) => {
    try {
        const response = await manageIncomingBidsController.acceptIncomingBid(req.body);
        res.status(200).send(response);
    } catch (error) {
        if (error === "LEADING_COMPANY_BALANCE_NOT_ENOUGH") {
            res.status(400).send("Leading firm does not have enough balance for this bid.");
        }
        else if(error === "INVALID_BID"){
            res.status(400).send("This bid is invalid at the moment.");
        }
        else {
            res.status(400).send("An error occurred in accept bid on a mission: " + error);
        }
    }
});

// Body: {bidId: int}
router.post('/rejectIncomingBid', async(req, res) => {
    try {
        const response = await manageIncomingBidsController.rejectIncomingBid(req.body);
        res.status(200).send(response);
    } catch (error) {
            res.status(400).send("An error occurred in rejecting bid: " + error);
    }
});

module.exports = router;