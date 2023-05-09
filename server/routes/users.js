const Router = require('express').Router
const router = Router();
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')
const data = require('../data');
const validation = require('../validation');
const theusers = data.users;
const redis = require('redis');
const client = redis.createClient();
const xss = require('xss');

client.on('error', (error) => {
    console.error(error)
})

var serviceAccount = require("../adminKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

router.route('/login').post(async (req, res) => {
    console.log('login');
    let uid = undefined;
    const idToken = xss(req.body.idToken);
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      uid = decodedToken.uid;
      const user = await theusers.getUserById(uid);
      if (!req.session.user) {
        req.session.user = user;
        try {
          const streak = await theusers.updateStreak(user._id);
          console.log(streak);
          const userUpdated = await theusers.getUserById(uid);
          res.json(userUpdated);
          return;
        } catch (e) {
          console.log(e);
          res.status(400).send(e);
          return;
        }
      } else {
        return res.json(user);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

router
    .route('/logout')
    .get(async (req, res) => {
        console.log('logout')
        req.session.destroy();
        res.json({ success: "logged out successfully." })

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

router.post('/AUser',async(req,res)=>{
    try{
        if(!req.body.userId){
            return res.status(400).send("Not found");
        }
        const getUser=await theusers.getUserById(req.body.userId);
        return res.json(getUser);
    }catch(e){
        return res.status(400).json({ title: "Sign Up", error: e });
    }
});

module.exports = router