const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const userData = require('./users');
const validation = require('../validation');
const { ObjectId } = require('mongodb');

const createTodoItem = async (userId,id,todo,completed) => {
    if(!userId || !id){
        throw "Error: UserId/TodoId is required"
    }
    if(!todo || todo.trim().length===0){
        throw "Error:Todo is required"
    }
    if(typeof completed !== "boolean"){
        throw "Error: Completed needs to be a boolean value"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let updatedTodos = [...aUser.todo, {_id: id, todo: todo, completed: completed}];
    await usersCollection.updateOne({_id: userId}, {$set: {todo: updatedTodos}});
    await userData.setAchievement(userId, 'makeTodo');
    let getNewUser=await userData.getUserById(userId);
    return getNewUser;
}

const getTodosByUser = async (userId) => {
    if(!userId){
        throw "Error: UserId is required"
    }
    let aUser = await userData.getUserById(userId);
    return aUser.todo;
}

const updateTodo=async(userId,id)=>{
    if(!userId || !id){
        throw "Error: UserId and TodoId are required"
    }
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allTodos = aUser.todo;
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i]._id === id) {
        let updateComplete = !Boolean(allTodos[i].completed);
        allTodos[i] = {
          _id: allTodos[i]._id,
          todo: allTodos[i].todo,
          completed: updateComplete
        };
        await usersCollection.updateOne({ _id: userId }, { $set: { todo: allTodos} });
        await userData.setAchievement(userId, 'finishTodo');
        let getNewUser = await userData.getUserById(userId);
        return getNewUser;
      }
    }
    throw "Error: Todo not found";
  };  
  
module.exports = {
    createTodoItem,
    getTodosByUser,
    updateTodo,
}
