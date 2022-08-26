module.exports = {
  multipleMongooseToObject: (courses) =>
    courses.map((course) => course.toObject()),
  mongooseToObject: (course) => (course ? course.toObject() : course),
};
