const Router = require('express').Router
const router = Router();
const { initializeApp } = require('firebase-admin/app');
const auth = require('firebase-admin/auth')
const app = initializeApp();

auth.

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

        getAuth()

    })



module.exports = router