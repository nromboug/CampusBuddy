const sessionData = require('./sessions');
const userData= require('./users');
const todoData = require('./toDos');
const goalsData=require('./goals');

module.exports = {
  sessions: sessionData,
  users: userData,
  todos: todoData,
  goals: goalsData,
};