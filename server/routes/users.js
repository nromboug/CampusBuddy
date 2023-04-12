const Router = require('express').Router
const router = Router();

router
    .route('/:id')
    .get(async (req, res) => {
        res.json('test')
    })

router
    .route('/')
    .post(async (req, res) => {
        
    })



module.exports = router