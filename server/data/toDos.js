const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const userData = require('./users');
const validation = require('../validation');
const { ObjectId } = require('mongodb');

const createTodoItem = async (userId,id,todo, completed) => {
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let updatedTodos = [...aUser.todo, {_id: id, todo: todo, completed: completed}];
    await usersCollection.updateOne({_id: userId}, {$set: {todo: updatedTodos}});
    let getNewUser=await userData.getUserById(userId);
    return getNewUser;
}

const getTodosByUser = async (userId) => {
    let aUser = await userData.getUserById(userId);
    return aUser.todo;
}

const updateTodo=async(userId,id)=>{
    const usersCollection = await users();
    let aUser = await userData.getUserById(userId);
    let allTodos = aUser.todo;
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].id === id) {
        let updateComplete = !Boolean(allTodos[i].completed);
        allTodos[i] = {
          id: allTodos[i].id,
          todo: allTodos[i].todo,
          completed: updateComplete
        };
        await usersCollection.updateOne({ _id: userId }, { $set: { todo: allTodos} });
        let getNewUser = await userData.getUserById(userId);
        return getNewUser;
      }
    }
    throw "Error: Todo not found";
  };  
  

/*
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
    createTodoItem,
    getTodosByUser,
    updateTodo,
}
