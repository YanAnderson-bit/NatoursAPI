const express = require('express');

const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(express.static(`${process.env.PWD}/public`));
app.use('/api/v1/users', routes.usersRoutes);
app.use('/api/v1/tours', routes.toursRoutes);

module.exports = app;
