const Router = require('express').Router
const router = Router();
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')
const data = require('../data');
const validation = require('../validation');
const theusers = data.users;


var serviceAccount = require("../adminKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

router
    .route('/login')
    .post(async (req, res) => {
        console.log('login');
        let uid = undefined;
        admin
            .auth()
            .verifyIdToken(req.body.idToken)
            .then(function (decodedToken) {
                uid = decodedToken.uid;
                theusers.getUserById(uid).then(user => {
                    req.session.user = user;
                    req.session.save()
                    theusers.updateStreak(user._id).then(
                        streak => console.log(streak)
                    ).catch(
                        e => console.log(e)
                    )
                    res.json(user);
                    return
                })
            })
            .catch(function (error) {
                console.log(error);
                res.status(400).json({error: error})
                return
            })
    })

router
    .route('/logout')
    .get(async (req, res) => {
        console.log('logout')
        req.session.destroy();
        res.json({success: "logged out successfully."})
        
    })

router.post('/signup', async (req, res) => {
    try {
        console.log('signup\n', req.body);
        req.body.name = validation.checkName(req.body.name);
        req.body.username = validation.checkUserName(req.body.username);
        req.body.email = validation.checkEmail(req.body.email);
        const newUser = await theusers.createUser(req.body.id, req.body.name, req.body.username, req.body.email);
        if (!newUser) {
            console.log('mongo error');
            return res.status(500).send("Internal Server Error");
        }
        else {
            return res.json(newUser);
        }
    }
    catch (e) {
        return res.status(400).json({ title: "Sign Up", error: e });
    }
});

router
    .route('/:id')
    .get(async (req, res) => {
        res.json('test')
    })


module.exports = router