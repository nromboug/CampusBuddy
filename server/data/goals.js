const mongoCollections = require("../config/mongoCollections");
const users=mongoCollections.users;
const userData = require('./users');
const validation = require('../validation');
const { ObjectId } = require('mongodb');

const addGoal=async(userId,id,goal,progress,target)=>{
    progress=parseInt(progress);
    target=parseInt(target);
    if(isNaN(progress) || isNaN(target)){
        throw "Error: Progress or target have to be numbers"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let updatedGoals = [...aUser.goals, {_id: id, goal: goal, progress: progress, target: target}];
    await usersCollection.updateOne({_id: userId}, {$set: {goals: updatedGoals}});
    let getNewUser=await userData.getUserById(userId);
    return getNewUser;
}

const getGoals=async(userId)=>{
    let aUser = await userData.getUserById(userId);
    return aUser.goals;
}

const deleteGoal = async (userId, goalid) => {
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].id === goalid) {
        allGoals.splice(i,1);
        await usersCollection.updateOne({ _id: userId }, { $set: { goals: allGoals } });
        let getNewUser = await userData.getUserById(userId);
        return getNewUser;
      }
    }
    throw "Error: Cannot find goal";
  }
  

const incrementGoal = async (userId, goalid) => {
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].id === goalid) {
        if (allGoals[i].progress < allGoals[i].target) {
          let updatedProgress = allGoals[i].progress + 1;
          allGoals[i] = {
            id: allGoals[i].id,
            goal: allGoals[i].goal,
            progress: updatedProgress,
            target: allGoals[i].target
          };
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
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allGoals = aUser.goals;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].id === goalid) {
        if (allGoals[i].progress !==0) {
          let updatedProgress = allGoals[i].progress - 1;
          allGoals[i] = {
            id: allGoals[i].id,
            goal: allGoals[i].goal,
            progress: updatedProgress,
            target: allGoals[i].target
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

/*
const createTodoItem = async (userId, title, details) => {
    if (!userId)
        throw "must provide a userId."
    await userData.getUserById(userId);

    if (!title || title.trim().length === 0 || !/^[0-9]*([a-zA-Z ]{2,})[0-9]*$/.test(title.trim()))
        throw "Title must be more descriptive, and can only contain letters, numbers, and spaces."
    if (!details || details.trim().length === 0 || !/[a-zA-Z ]{9,}/.test(details.trim()))
        throw "Details must be more descriptive."

    const newTodo = {
        userId: userId.trim(),
        title: title.trim(),
        finished: false
    }

    const todoCollection = await todos();

    const inserted = await todoCollection.insertOne(newTodo);
    if (!inserted.acknowledged || !inserted.insertedId) {
        throw "Error: Could not Add User"
    }
    const found = await todoCollection.findOne({ _id: inserted.insertedId })
    return { found }

}

const getTodosByUser = async (userId) => {
    if (!userId.trim())
        throw 'Must provide UserId';
    userId = userId.trim();
    const todoCollection = await todos();

    const todos = await todoCollection.find({ userId: userId }).toArray();

    return todos;

}

const getTodoById = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';
    id = id.trim();
    const todoCollection = await todos();

    const todos = await todoCollection.find({ _id: new ObjectId(id) }).toArray();

    return todos;

}

const deleteTodo = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';

    const todoCollection = await todos();
    
    const deleted = await todoCollection.deleteOne({ _id: new ObjectId(id) });

    if (deleted.deletedCount !== 1) {
        throw "not deleted";
    }

    return deleted;
}

const markFinished = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';

    const todoCollection = await todos();

    const updated = await todoCollection.updateOne(
        {
            _id: new ObjectId(id)
        }, {
        $set: { finished: true }
    }).toArray();

    if (updated) {
        throw "not deleted";
    }

    return todos;
}

const markUnfinished = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';

    const todoCollection = await todos();

    const updated = await todoCollection.updateOne(
        {
            _id: new ObjectId(id)
        }, {
        $set: { finished: false }
    }).toArray();

    if (updated) {
        throw "not deleted";
    }

    return todos;
}
*/

module.exports = {
    addGoal,
    getGoals,
    incrementGoal,
    decrementGoal,
    deleteGoal,
}
