const Router = require('express').Router
const router = Router();

router
    .route('/:id')
    .get(async (req, res) => {
        res.json('test')
    });



module.exports = router