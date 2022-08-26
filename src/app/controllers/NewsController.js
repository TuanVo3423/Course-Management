class NewsController {
  // [GET] news/
  index(req, res) {
    res.render('news');
  }
  // [GET] news/:slugs
  show(req, res) {
    res.send('This is the news page !!!');
  }
}
module.exports = new NewsController();
