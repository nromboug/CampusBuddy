const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes/index.js');
const cors = require('cors');

app.use(cors());

configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
});
