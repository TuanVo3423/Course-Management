const Course = require('../model/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose.js');
// const objectID = require('mongoose').objectID;
// var post = {
//   id :new objectID,
//   name : 'post init'

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('home', {
          // handle render in here , but first of all , you need to covert to literial object
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}
module.exports = new SiteController();
