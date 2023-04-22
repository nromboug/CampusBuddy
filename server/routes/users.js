const Router = require('express').Router
const router = Router();
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')

var serviceAccount = require("../adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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



module.exports = router