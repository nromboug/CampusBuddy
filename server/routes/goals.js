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
        let theKeys=await client.keys("*");
        let userInfo="";
        for(let i=0;i<theKeys.length;i++){
            let theUser=await client.get(theKeys[i]);
            if(JSON.parse(theUser).user){
                userInfo=JSON.parse(theUser);
                break;
            }
        }
        let pushGoal=await thegoals.addGoal(userInfo.user._id,req.body.id,req.body.goal,req.body.progress, req.body.target);
        return res.json(pushGoal);
    }catch(e){
        res.json(e);
    }
  });

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

  router.patch('/increment', async (req, res) => {
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
        let newUser=await thegoals.incrementGoal(userInfo.user._id,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

  router.patch('/decrement', async (req, res) => {
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
        let newUser=await thegoals.decrementGoal(userInfo.user._id,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

  router.delete('/', async (req, res) => {
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
        let newUser=await thegoals.deleteGoal(userInfo.user._id,req.body.id);
        return res.json(newUser);
    }catch(e){
        res.json(e);
    }
  });

module.exports = router