const sessionData = require('./sessions');
const userData= require('./users');
const todoData = require('./toDos')

module.exports = {
  sessions: sessionData,
  users: userData,
  todos: todoData
};