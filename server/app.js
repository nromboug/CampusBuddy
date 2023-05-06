const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes/index.js');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const cors = require('cors');
const path = require('path');

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
        saveUninitialized: true, // recommended: only save session when data exists
        secret: "secret phrase",
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie 
            maxAge: 1000 * 60 * 10 // session max age in miliseconds
        }

    })
)


app.use('/', (req, res, next) => {
    if (req.session.user) {
        console.log('in session!');
    } else {
        console.log('not in session');
    }
    next();
})


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
});
