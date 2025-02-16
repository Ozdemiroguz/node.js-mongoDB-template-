module.exports = (app) => {
  app.use('/api/auths', require('./auth.route'));
};
