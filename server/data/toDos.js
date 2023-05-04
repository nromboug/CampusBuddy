const mongoCollections = require("../config/mongoCollections");
const todos = mongoCollections.todos;
const userData = require('./users');
const validation = require('../validation');
const { ObjectId } = require('mongodb');

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

    const todos = await todoCollection.find({ _id: ObjectId(id) }).toArray();

    return todos;

}

const deleteTodo = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';

    const todoCollection = await todos();

    const deleted = await todoCollection.deleteOne({ _id: ObjectId(id) }).toArray();

    if (deleted.deletedCount !== 1) {
        throw "not deleted";
    }

    return todos;
}

const markFinished = async (id) => {
    if (!id.trim() || !ObjectId.isValid(id))
        throw 'Must provide valid id';

    const todoCollection = await todos();

    const updated = await todoCollection.updateOne(
        {
            _id: ObjectId(id)
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
            _id: ObjectId(id)
        }, {
        $set: { finished: false }
    }).toArray();

    if (updated) {
        throw "not deleted";
    }

    return todos;
}

module.exports = {
    getTodoById,
    getTodosByUser,
    createTodoItem,
    deleteTodo,
    markFinished,
    markUnfinished
}
