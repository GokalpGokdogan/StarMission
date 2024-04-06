const express = require('express');
const app = express();

// routers

const logRegRoute = require('./routes/logRegRoute');
const manageEmployeesRoute = require('./routes/company/manageEmployeesRoute');


app.use(express.json());

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
app.use('/manageEmployees', manageEmployeesRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});