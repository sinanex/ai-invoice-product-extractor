const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
  console.log(`Project ID: ${process.env.PROJECT_ID}`);
});
