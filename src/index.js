const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const Routes = require('./routes');
const db = require('./configs/db');
const SortMiddleWares = require('./app/middlewares/SortMiddleWare');
const app = express();
const port = 3000;
// connect to db
db.connect();

// css
app.use(express.static(path.join(__dirname, 'public')));

// use middleWare to save the body variable in post method

app.use(express.urlencoded({ extended: true })); // case post data by using form
app.use(express.json()); // case post data by using js

app.use(methodOverride('_method'));

// add custiom middleWares
app.use(SortMiddleWares);

// HTTP logger
app.use(morgan('combined'));
// template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sort : (fieldSort , sort) => {
        // examples : name , description , kh khop 
        const sortType = fieldSort === sort.column ? sort.type : 'default';
        const icons = {
          default: 'fa-solid fa-elevator',
          desc : 'fa-solid fa-sort-down',
          asc : 'fa-solid fa-sort-up'
        }
        const types = {
          default : 'desc',
          desc : 'asc',
          asc : 'desc',
        }
        const icon = icons[sortType];
        const type = types[sortType];
        // <a href="?_sort&column=${name}&type=${desc}
        return `<a href="?_sort&column=${fieldSort}&type=${type}">
                <i class="${icon}"></i>
                </a>`


      }
    },

  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

Routes(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
