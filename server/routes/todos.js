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
const xss=require('xss');

router.post('/allTodos', async (req, res) => {
    try{
        req.body.id=xss(req.body.id);
        if(!req.body.id){
            return res.status(400).send("UserId is required");
        }
        let getUser=await theusers.getUserById(req.body.id);
        res.json(getUser.todo);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.post('/', async (req, res) => {
    try{
        req.body.id=xss(req.body.id);
        req.body.userId=xss(req.body.userId);
        req.body.todo=xss(req.body.todo);
        req.body.completed=xss(req.body.completed);
        if(!req.body.id || !req.body.userId){
            return res.status(400).send("UserId and TodoId are required");
        }
        if(!req.body.todo || req.body.todo.trim().length===0){
            return res.status(400).send("Todo is required");
        }
        let pushTodo=await thetodos.createTodoItem(req.body.userId,req.body.id,req.body.todo,false);
        return res.json(pushTodo);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.patch('/', async (req, res) => {
    try{
        req.body.id=xss(req.body.id);
        req.body.userId=xss(req.body.userId);
        if(!req.body.id){
            return res.status(400).send("TodoId is required");
        }
        let newUser=await thetodos.updateTodo(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        return res.status(500).send(e);
    }
  });
  
module.exports = router