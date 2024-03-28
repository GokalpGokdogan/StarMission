const express = require('express');
const app = express();

// routers
const userRouter = require('./routes/user_router');


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/user', userRouter);