const Course = require('../model/Course');
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require('../../utils/mongoose');
class MeController {
  // [GET] me/stored/courses
  storedCourses(req, res, next) {
    if(req.query.hasOwnProperty('_sort')){
      res.json({message: 'successfully'});
      return;
    };
    Promise.all([Course.find({}),Course.countDocumentsDeleted()])
        .then(([courses , countDeleted]) => {
          res.render('me/stored-courses', {
            countDeleted,
            courses: multipleMongooseToObject(courses),
          });
        })
        .catch(next);
  }
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new MeController();
