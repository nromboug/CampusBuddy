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

router.post('/allTodos', async (req, res) => {
    try{
        if(!req.body.id){
            throw new Error("UserId is required");
        }
        let getUser=await theusers.getUserById(req.body.id);
        res.json(getUser.todo);
    }catch(e){
        res.json(e);
    }
  });

  router.post('/', async (req, res) => {
    try{
        if(!req.body.id || !req.body.userId){
            throw new Error('UserId and TodoId are required');
        }
        if(!req.body.todo || req.body.todo.trim().length===0){
            throw new Error('Todo is required');
        }
        if (req.body.completed!==true && req.body.completed!==false) {
            throw new Error('Completed needs to be a boolean value');
        }
        let pushTodo=await thetodos.createTodoItem(req.body.userId,req.body.id,req.body.todo,req.body.completed);
        return res.json(pushTodo);
    }catch(e){
        res.json(e);
    }
  });

  router.patch('/', async (req, res) => {
    try{
        if(!req.body.id || !req.body.userId){
            throw new Error('UserId and TodoId are required');
        }
        let newUser=await thetodos.updateTodo(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });
  
module.exports = router