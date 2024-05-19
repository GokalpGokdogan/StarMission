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
const ledMissionsRoute = require('./routes/company/ledMissionsRoute');
const manageIncomingBidsRoute = require('./routes/company/manageIncomingBidsRoute');
const companyProfileRoute = require('./routes/company/profileRoute');

const getMissionInfoRoute = require("./routes/astronaut/getMissionInfoRoute");
const manageApplicationsRoute = require("./routes/astronaut/manageApplicationsRoute");
const astronautProfileRoute = require("./routes/astronaut/profileRoute");

const manageReportsRoute = require("./routes/admin/manageReportsRoute");
const createViewsRoute = require("./routes/admin/createViewsRoute");
const adminProfileRoute = require('./routes/admin/profileRoute');

const imageRoute = require("./routes/imageRoute");

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


app.use((err, req, res, next) => {
    if (err.code === 'ECONNRESET' || err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
        console.log('ECONNRESET occurred');
        res.status(500).send('Connection was reset');
    } else {
        next(err);
    }
});

// routes
app.use('/logReg', logRegRoute);
app.use('/', imageRoute);

app.use('/company/manageEmployees', manageEmployeesRoute); 
app.use('/company/applications', applicationsRoute);
app.use('/company/missionPostings', missionPostingsRoute); 
app.use('/company/ledMissions', ledMissionsRoute);

app.use('/company/myBids', myBidsRoute); 
app.use('/company/createMission', createMissionRoute);
app.use('/company/manageIncomingBids', manageIncomingBidsRoute);
app.use('/astronaut/getMissionInfo', getMissionInfoRoute); 
app.use('/astronaut/manageApplications', manageApplicationsRoute); 

app.use('/admin/manageReports', manageReportsRoute);
app.use('/admin/createViews', createViewsRoute);
app.use('/admin/profile', adminProfileRoute);

app.use('/company/profile', companyProfileRoute);
app.use('/astronaut/profile', astronautProfileRoute);

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

server.timeout = 1000 * 60 * 0; // 0 minutes
