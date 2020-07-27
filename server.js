const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));

const configDB = require('./app/mongo/config');
//
console.log(`===== Connecting to: ${process.env.MONGO_DB_NAME}`);
// mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(configDB.url, configDB.options, () =>
  console.log('Connected to db')
);

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.use('/friends', require('./app/routes/friendsRoutes'));
app.use('/', require('./app/routes/routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
