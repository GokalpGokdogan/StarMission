const express = require('express');
const router = express.Router();
const {activeMissionDistributionOverCompanies,closestEndTimeMissions,mostActiveMissionCompanies,mostBudgetMissions,mostPartneredMissions,mostPastMissionAstronauts} = require('../../controllers/admin/createViewsController');

router.post('/', async(req, res) => {
    try {

        let response = await activeMissionDistributionOverCompanies();
        response = await closestEndTimeMissions();
        response = await mostActiveMissionCompanies();
        response = await mostBudgetMissions();
        response = await mostPartneredMissions();
        response = await mostPastMissionAstronauts();

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send("An error occurred in creating views: " + error);
    }
});

module.exports = router;