const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


// routers

const logRegRoute = require('./routes/logRegRoute');
const manageEmployeesRoute = require('./routes/company/manageEmployeesRoute');
const applicationsRoute = require('./routes/company/applicationsRoute');

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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});