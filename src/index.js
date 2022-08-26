const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const Routes = require('./routes');
const db = require('./configs/db');
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

// HTTP logger
app.use(morgan('combined'));
// template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      toDate : (dateInDB) => {
        console.log(dateInDB);
        return new Date(dateInDB).getDate();

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
