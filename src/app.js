const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.static(`${process.env.PWD}/public`));
app.use('/api/v1/users', routes.userRouter);
app.use('/api/v1/tours', routes.tourRouter);

module.exports = app;
