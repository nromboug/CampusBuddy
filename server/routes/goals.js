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
  
  router.post('/', async (req, res) => {
    try{
        req.body.progress = parseInt(req.body.progress);
        req.body.target = parseInt(req.body.target);
        if (isNaN(req.body.progress) || isNaN(req.body.target)) {
            throw new Error('Progress and target must be numbers');
        }
        if(!req.body.userId || !req.body.id){
            throw new Error('UserId and GoalId are required');
        }
        if(!req.body.goal || req.body.goal.trim().length===0){
            throw new Error('Goal is required');
        }
        let pushGoal=await thegoals.addGoal(req.body.userId,req.body.id,req.body.goal,req.body.progress, req.body.target);
        return res.json(pushGoal);
    }catch(e){
        res.json(e);
    }
  });

  router.post('/allGoals', async (req, res) => {
    try{
        if(!req.body.id){
            throw new Error('UserId is required');
        }
        let getUser=await theusers.getUserById(req.body.id);
        res.json(getUser.goals);
    }catch(e){
        res.json(e);
    }
  });

  router.patch('/increment', async (req, res) => {
    try{
        if(!req.body.userId || !req.body.id){
            throw new Error('UserId and GoalId is required');
        }
        let newUser=await thegoals.incrementGoal(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

  router.patch('/decrement', async (req, res) => {
    try{
        if(!req.body.userId || !req.body.id){
            throw new Error('UserId and GoalId is required');
        }
        let newUser=await thegoals.decrementGoal(req.body.userId,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

  router.delete('/:userId/:id', async (req, res) => {
    try{
        if(!req.params.userId || !req.params.id){
            throw new Error('UserId and GoalId is required');
        }
        let newUser=await thegoals.deleteGoal(req.params.userId,req.params.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

module.exports = router