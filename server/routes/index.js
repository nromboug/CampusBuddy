const userRoutes = require('./users.js')
const sessionRoutes = require('./sessions.js')
const todoRoutes = require('./todos.js')
const uploadRoutes=require('./upload.js');
const goalRoutes=require('./goals.js')

const configRoutes = (app) => {
    app.use('/users', userRoutes);
    app.use('/sessions', sessionRoutes);
    app.use('/todos', todoRoutes);
    app.use('/upload',uploadRoutes);
    app.use('/goals',goalRoutes);
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
module.exports = configRoutes