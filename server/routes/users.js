const Router = require('express').Router
const router = Router();
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')
const data=require('../data');
const validation = require('../validation');
const theusers=data.users;

/*
var serviceAccount = require("../adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
*/

router
    .route('/:id')
    .get(async (req, res) => {
        res.json('test')
    })
    

router
    .route('/login')
    .post(async (req, res) => {
        console.log('login');
        res.send('skeet');

        admin
            .auth()
            .verifyIdToken(req.body.idToken)
            .then(function (decodedToken) {
                console.log(decodedToken);
            })
            .catch(function (error) {
                console.log(error);
            })
    })

router.post('',async(req,res) =>{
    try
    {
        req.body.name=validation.checkName(req.body.name);
        req.body.username=validation.checkUserName(req.body.username);
        req.body.password=validation.checkPassWord(req.body.password);
        req.body.email=validation.checkEmail(req.body.email);
        const newUser=await theusers.createUser(req.body.name,req.body.username,req.body.email,req.body.password);
        if(!newUser)
        {
            return res.status(500).send("Internal Server Error");
        }
        else
        {
            return res.json(newUser);
        }
    }
    catch(e)
    {
        return res.status(400).json({title: "Sign Up", error: e});
    }
});



module.exports = router