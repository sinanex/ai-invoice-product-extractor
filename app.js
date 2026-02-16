require('dotenv').config();

const express = require('express');
const scanRoute = require('./routes/scanRoute');

const app = express();

app.use(express.json());

// API Route
app.use('/api', scanRoute);

// VERY IMPORTANT EXPORT
module.exports = app;
