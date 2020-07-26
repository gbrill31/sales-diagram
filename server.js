const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));

const configDB = require('./app/mongo/config');
//
console.log(
  `===== Connecting to: ${configDB[process.env.NODE_ENV || 'development'].url}`
);
// mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(
  configDB[process.env.NODE_ENV || 'development'].url,
  configDB.options
);
require('./app/config/passport')(passport); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'build')));

require('./app/config/middleware')(app);

app.post('/report-violation', (req, res) => {
  if (req.body) {
    console.log('CSP Violation: ', req.body);
  } else {
    console.log('CSP Violation: No data received!');
  }

  res.status(204).end();
});

// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Pass to next layer of middleware
//   next();
// });

app.use('/', require('./app/routes/authRoutes')(app, passport));
app.use('/api', require('./app/routes/apiRoutes')(passport));
app.use('/api/user', require('./app/routes/userRoutes'));
app.use('/api/project', require('./app/routes/projectApiRoutes'));
app.use('/', require('./app/routes/routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
    next();
  });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
