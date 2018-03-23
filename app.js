var express = require('express');
var passport = require('api-js/passport');
var database = require('./database');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(passport.initialize());
require('./passport')(passport);

var cors = require('cors');
app.use(cors())

// Connect to Database
database.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// setup routes
var routes = require('./routes');
routes.setup(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('NotFound');
  err.status = 404;
  err.message = 'requested command not found';
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
