const mongoCollections = require("../config/mongoCollections");
const todos = mongoCollections.todos;
const userData = require('./users');
const validation = require('../validation');

const createTodoItem = async (userId, title, details, finished) => {
    try {
        userData.getUserById(userId);
    } catch (e) {
        throw " no user with given Id";
    }

    
}