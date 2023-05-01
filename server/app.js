const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes/index.js');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const cors = require('cors');

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

redisClient.connect()

let redisStore = new RedisStore({
    client: redisClient
})

app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: "secret phrase",
    })
)

app.use(cors());

app.use(express.json());

configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
});
