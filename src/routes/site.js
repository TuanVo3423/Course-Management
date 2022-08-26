const express = require('express');
const route = express.Router();

const siteController = require('../app/controllers/SiteController');

// because this is a sub routes , but this is site routes combines home ...
route.get('/search', siteController.search);
route.get('/', siteController.index);

module.exports = route;
