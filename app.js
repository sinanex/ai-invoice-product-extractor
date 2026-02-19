require('dotenv').config();

const express = require('express');
const scanRoute = require('./routes/scanRoute');

const app = express();

app.use(express.json());

app.use('/api', scanRoute);

app.get('/health', (req, res) => {

  const uptimeSec = process.uptime();

  const days = Math.floor(uptimeSec / (24 * 60 * 60));
  const hours = Math.floor((uptimeSec % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((uptimeSec % (60 * 60)) / 60);
  const seconds = Math.floor(uptimeSec % 60);

  const uptime = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

  res.status(200).json({
    status: "OK",
    message: "Server is running 🚀",
    uptime: uptime,
    timestamp: new Date(),
  });

});


module.exports = app;
