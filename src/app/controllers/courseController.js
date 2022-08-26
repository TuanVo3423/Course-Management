const {
  mongooseToObject,
  multipleMongooseToObject,
} = require('../../utils/mongoose');
const Course = require('../model/Course');
class CourseController {
  // [GET] courses/
  index(req, res, next) {
    // load data from model
    // model connect db
    // find here , it means return all document
    Course.find({})
      .then((courses) => {
        res.render('home', {
          // handle render in here , but first of all , you need to covert to literial object
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [GET] courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('course/show', {
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }
  // [GET] courses/create
  create(req, res, next) {
    res.render('course/create');
  }
  // [POST] courses/store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => {
        res.redirect('/courses');
      })
      .catch(next);
  }
  // [GET] courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('course/edit', {
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }
  // [PUT] courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/me/stored/courses');
      })
      .catch(next);
  }
  // [DELTE] courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }

  // [PATCH] courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }

  // [DELETE] courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }
 // [POST] courses/handle-action-form
  handleActionForm(req, res, next) {
    switch (req.body.action) {
      case 'delete':{
        Course.delete({ _id: {$in : req.body.courseIds} })
            .then(() => {
               res.redirect('back');
              })
            .catch(next);

        break;
      }
      default : res.json({message : 'Action is invalid'});
    }
  }

  handleTrashAction(req, res, next) {
    switch (req.body.action) {
      case 'deleteForce':{
        Course.deleteMany({ _id: req.body.courseIds })
            .then(() => {
               res.redirect('back');
              })
            .catch(next);
        break;
      }
      case 'restore' : {
      Course.restore({ _id: {$in : req.body.courseIds} })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
        break;
      }
      default : res.json({message : 'Action is invalid'});
    }
  }

}
module.exports = new CourseController();
