require('dotenv').config();

const express = require('express');
const scanRoute = require('./routes/scanRoute');

const app = express();

app.use(express.json());

app.use('/api', scanRoute);


app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🚀",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

module.exports = app;
