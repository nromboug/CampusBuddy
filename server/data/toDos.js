const mongoCollections = require("../config/mongoCollections");
const todos = mongoCollections.todos;
const userData = require('./users');
const validation = require('../validation');

const createTodoItem = async (userId, title, details) => {
    if (!userId)
        throw "must provide a userId."
    try {
        userData.getUserById(userId);
    } catch (e) {
        throw " no user with given Id";
    }

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
    return { insertedId: inserted.insertedId }

}

const getTodosByUser = async (userId) => {
    if (!userId)
        throw 'Must provide UserId';

    const todoCollection = await todos();

    const todos = await todoCollection.find({ userId: userId }).toArray();

    return todos;

}

const getTodoById = async (id) => {
    if (!id)
        throw 'Must provide UserId';

    const todoCollection = await todos();

    const todos = await todoCollection.find({ _id: id }).toArray();

    return todos;

}




module.exports = {
    getTodoById,
    getTodosByUser,
    createTodoItem
}
