const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


// routers
const logRegRoute = require('./routes/logRegRoute');

const manageEmployeesRoute = require('./routes/company/manageEmployeesRoute');
const applicationsRoute = require('./routes/company/applicationsRoute');
const missionPostingsRoute = require('./routes/company/missionPostingsRoute');
const myBidsRoute = require('./routes/company/myBidsRoute');
const createMissionRoute = require('./routes/company/createMissionRoute');

const getMissionInfoRoute = require("./routes/astronaut/getMissionInfoRoute");
const manageApplicationsRoute = require("./routes/astronaut/manageApplicationsRoute");

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// routes
app.use('/logReg', logRegRoute);

app.use('/company/manageEmployees', manageEmployeesRoute);
app.use('/company/applications', applicationsRoute);
app.use('/company/missionPostings', missionPostingsRoute);
app.use('/company/myBids', myBidsRoute);
app.use('/company/createMission', createMissionRoute);

app.use('/astronaut/getMissionInfo', getMissionInfoRoute);
app.use('/astronaut/manageApplications', manageApplicationsRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});