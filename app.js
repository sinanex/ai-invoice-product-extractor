require('dotenv').config();

const express = require('express');
const scanRoute = require('./routes/scanRoute');

const app = express();

app.use(express.json());

app.use('/api', scanRoute);
module.exports = app;
