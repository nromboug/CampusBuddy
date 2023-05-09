const mongoCollections = require("../config/mongoCollections");
const users=mongoCollections.users;
const userData = require('./users');
const validation = require('../validation');
const { ObjectId } = require('mongodb');

const addGoal=async(userId,id,goal,progress,target)=>{
    progress=parseInt(progress);
    target=parseInt(target);
    if(!userId || !id){
        throw "Error: UserId/GoalId is required"
    }
    if(isNaN(progress) || isNaN(target)){
        throw "Error: Progress or target have to be numbers"
    }
    if(!goal || goal.trim().length===0){
        throw "Error: Goal has to be filled in"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let updatedGoals = [...aUser.goals, {_id: id, goal: goal, progress: progress, target: target, completionDate: null}];
    await usersCollection.updateOne({_id: userId}, {$set: {goals: updatedGoals}});
    await userData.setAchievement(userId, "makeGoal");
    let getNewUser=await userData.getUserById(userId);
    return getNewUser;
}

const getGoals=async(userId)=>{
    if(!userId){
        throw "Error: UserId is required"
    }
    let aUser = await userData.getUserById(userId);
    return aUser.goals;
}

const deleteGoal = async (userId, goalid) => {
    if(!userId || !goalid){
        throw "Error: UserId/GoalId is required"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
        if (allGoals[i]._id === goalid) {
            allGoals.splice(i,1);
            await usersCollection.updateOne({ _id: userId }, { $set: { goals: allGoals } });
            let getNewUser = await userData.getUserById(userId);
            console.log(getNewUser);
            return getNewUser;
        }
    }
    throw "Error: Cannot find goal";
  }
  

const incrementGoal = async (userId, goalid) => {
    if(!userId || !goalid){
        throw "Error: UserId/GoalId is required"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
        if (allGoals[i]._id === goalid) {
            if (allGoals[i].progress < allGoals[i].target) {
                let updatedProgress = allGoals[i].progress + 1;
                allGoals[i] = {
                _id: allGoals[i]._id,
                goal: allGoals[i].goal,
                progress: updatedProgress,
                target: allGoals[i].target,
                completionDate: updatedProgress === allGoals[i].target ? new Date() : allGoals[i].completionDate
                };
                if (updatedProgress === allGoals[i].target)
                    await userData.setAchievement(userId, 'finishGoal')
                await usersCollection.updateOne({ _id: userId }, { $set: { goals: allGoals } });
            let getNewUser = await userData.getUserById(userId);
            return getNewUser;
        } else {
            throw "Error: Target already reached";
        }
    }
    }
    throw "Error: Goal not found";
  };
  

const decrementGoal=async(userId,goalid)=>{
    if(!userId || !goalid){
        throw "Error: UserId/GoalId is required"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i]._id === goalid) {
        if (allGoals[i].progress !==0) {
          let updatedProgress = allGoals[i].progress - 1;
          allGoals[i] = {
            _id: allGoals[i]._id,
            goal: allGoals[i].goal,
            progress: updatedProgress,
            target: allGoals[i].target,
            completionDate: null
          };
          await usersCollection.updateOne({ _id: userId }, { $set: { goals: allGoals } });
          let getNewUser = await userData.getUserById(userId);
          return getNewUser;
        } else {
          throw "Error: Progress cannot be a negative number";
        }
      }
    }
    throw "Error: Goal not found";
}

module.exports = {
    addGoal,
    getGoals,
    incrementGoal,
    decrementGoal,
    deleteGoal,
}
