const userRoutes = require('./users.js')
const sessionRoutes = require('./sessions.js')

const configRoutes = (app) => {
    app.use('/users', userRoutes);
    app.use('/sessions', sessionRoutes);
    
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
module.exports = configRoutes