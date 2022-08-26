const newRouter = require('./news'); // import routes of news , it combines many sub routes in this
const siteRouter = require('./site');
const courseRouter = require('./courses');
const meRouter = require('./me');
function Routes(app) {
  app.use('/me', meRouter);
  app.use('/news', newRouter);
  app.use('/courses', courseRouter);
  app.use('/', siteRouter);
}
module.exports = Routes;
