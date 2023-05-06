const Router = require('express').Router
const router = Router();
const data = require('../data');
const validation = require('../validation');
const theusers = data.users;
const thetodos = data.todos
const { ObjectId } = require('mongodb');
const redis=require('redis');
const client=redis.createClient();
client.connect().then(()=>{});

router.get('/', async (req, res) => {
    try{
        let theKeys=await client.keys("*");
        let userInfo="";
        for(let i=0;i<theKeys.length;i++){
            let theUser=await client.get(theKeys[i]);
            if(JSON.parse(theUser).user){
                userInfo=JSON.parse(theUser);
                break;
            }
        }
        return res.json(userInfo);
    }catch(e){
        res.json(e);
    }
  });

  router.post('/', async (req, res) => {
    try{
        if (req.body.completed!==true && req.body.completed!==false) {
            throw new Error('Completed needs to be a boolean value');
        }
        let theKeys=await client.keys("*");
        let userInfo="";
        for(let i=0;i<theKeys.length;i++){
            let theUser=await client.get(theKeys[i]);
            if(JSON.parse(theUser).user){
                userInfo=JSON.parse(theUser);
                break;
            }
        }
        let pushTodo=await thetodos.createTodoItem(userInfo.user._id,req.body.id,req.body.todo,req.body.completed);
        return res.json(pushTodo);
    }catch(e){
        res.json(e);
    }
  });

  router.patch('/', async (req, res) => {
    try{
        let theKeys=await client.keys("*");
        let userInfo="";
        for(let i=0;i<theKeys.length;i++){
            let theUser=await client.get(theKeys[i]);
            if(JSON.parse(theUser).user){
                userInfo=JSON.parse(theUser);
                break;
            }
        }
        let newUser=await thetodos.updateTodo(userInfo.user._id,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

/*
router
    .route('/')
    .post(async (req, res) => {
        console.log('post todo')
        if (!req.body) {
            res.status(400).json({ error: 'No payload.' });
            return;
        }
        let userId = req.body.userId;
        let title = req.body.title;
        let details = req.body.details;

        if (!userId || !title || !details) {
            res.status(400).json({ error: 'Incorrect payload.' });
            return;
        }

        userId = userId.trim();
        title = title.trim();
        details = details.trim();

        try {
            const added = await thetodos.createTodoItem(userId, title, details);
            res.json(added);
            return
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .delete(async (req, res) => {
        console.log('delete todo')
        if (!req.body) {
            res.status(400).json({ error: 'No payload.' });
            return
        }
        let id = req.body.id;

        if (!id) {
            res.status(400).json({ error: 'Incorrect payload.' });
            return;
        }

        id = id.trim();

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Incorrect payload.' });
            return;
        }


        try {
            const deleted = await thetodos.deleteTodo(id);
            res.json(deleted);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    })
    .patch(async (req, res) => {
        console.log('update todo')
        if (!req.body) {
            res.status(400).json({ error: 'No payload.' });
            return
        }
        let id = req.body.id;
        let mark = req.body.mark;
        let newData = req.body.newData;

        if (!id || (!mark && !newData) || (mark && newData)) {
            res.status(400).json({ error: 'Incorrect payload.' });
            return;
        }

        id = id.trim();

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Incorrect payload.' });
            return;
        }

        if (mark) {
            
        }


    })

router
    .route('/logout')
    .get(async (req, res) => {
        console.log('logout');
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

*/
module.exports = router