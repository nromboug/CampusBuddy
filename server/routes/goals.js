const Router = require('express').Router
const router = Router();
const data = require('../data');
const validation = require('../validation');
const theusers = data.users;
const thegoals= data.goals;
const { ObjectId } = require('mongodb');
const redis=require('redis');
const client=redis.createClient();
client.connect().then(()=>{});
const xss=require('xss');
  
  router.post('/', async (req, res) => {
    try{
        req.body.progress=xss(req.body.progress);
        req.body.target=xss(req.body.target);
        req.body.userId=xss(req.body.userId);
        req.body.id=xss(req.body.id);
        req.body.goal=xss(req.body.goal);
        req.body.progress = parseInt(req.body.progress);
        req.body.target = parseInt(req.body.target);

        if (isNaN(req.body.progress) || isNaN(req.body.target)) {
            return res.status(400).send("Progress and Target Need to be Numbers");
        }
        if(!req.body.userId || !req.body.id){
            return res.status(400).send('UserId and GoalId are required');
        }
        if(!req.body.goal || req.body.goal.trim().length===0){
            return res.status(400).send('Goal is required');
        }
        let pushGoal=await thegoals.addGoal(req.body.userId,req.body.id,req.body.goal,req.body.progress, req.body.target);
        return res.json(pushGoal);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.post('/allGoals', async (req, res) => {
    try{
        req.body.id=xss(req.body.id);
        if(!req.body.id){
            return res.status(400).send('UserId is required');
        }
        let getUser=await theusers.getUserById(req.body.id);
        res.json(getUser.goals);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.patch('/increment', async (req, res) => {
    try{
        req.body.userId=xss(req.body.userId);
        req.body.id=xss(req.body.id);
        if(!req.body.userId || !req.body.id){
            return res.status(400).send('UserId and GoalId are required');
        }
        let newUser=await thegoals.incrementGoal(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.patch('/decrement', async (req, res) => {
    try{
        req.body.userId=xss(req.body.userId);
        req.body.id=xss(req.body.id);
        if(!req.body.userId || !req.body.id){
            return res.status(400).send('UserId and GoalId are required');
        }
        let newUser=await thegoals.decrementGoal(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        return res.status(500).send(e);
    }
  });

  router.delete('/:userId/:id', async (req, res) => {
    try{
        req.params.userId=xss(req.params.userId);
        req.params.id=xss(req.params.id);
        if(!req.params.userId || !req.params.id){
            return res.status(400).send('UserId and GoalId are required');
        }
        let newUser=await thegoals.deleteGoal(req.params.userId,req.params.id);
        return res.json(newUser);
    }catch(e){
        return res.status(500).send(e);
    }
  });

module.exports = router