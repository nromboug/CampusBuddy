const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes/index.js');

configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
  });
  