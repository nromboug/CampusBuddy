const Router = require('express').Router
const router = Router();
const data = require('../data');
const validation = require('../validation');
const theusers = data.users;
const thetodos = data.todos

router
    .route('/')
    .post(async (req, res) => {
        if (!req.body)
            return res.status(400).json({ error: 'No payload.' });
        const userId = req.body.userId;
        const title = req.body.title;
        const details = req.body.details;

        if (!userId || !title || !details)
            return res.status(400).json({ error: 'Incorrect payload.' });

        userId = userId.trim();
        title = title.trim();
        details = details.trim();

        try {
            const added = thetodos.createTodoItem(userId, title, details);
            res.json(added);
        } catch (e) {
            res.json(500).json(e);
        }
    })

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

router
    .route('/:id')
    .get(async (req, res) => {
        res.json('test')
    })


module.exports = router