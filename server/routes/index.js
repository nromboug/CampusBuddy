const userRoutes = require('./users.js')

const configRoutes = (app) => {
    app.use('/users', userRoutes)
  
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
module.exports = configRoutes