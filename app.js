var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var aboutRouter = require('./routes/about');
var createRouter = require('./routes/create');
var homeRouter = require('./routes/home');
var indexRouter = require('./routes/index');
var messagingRouter = require('./routes/messaging');
var addRouter = require('./routes/add');
var searchRouter = require('./routes/search');
var apiUserRouter = require('./routes/apiUser');
var apiBookRouter = require('./routes/apiBook');
var resetRouter = require('./routes/reset')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', aboutRouter);
app.use('/create', createRouter);
app.use('/', homeRouter); //home will just be the root directory
app.use('/index', indexRouter);
app.use('/messaging', messagingRouter);
app.use('/search', searchRouter);
app.use('/add', addRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/books', apiBookRouter);
app.use('/reset', resetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);

  // render the error page
  res.status(err.status || 500);
  res.json('Error!');
});

module.exports = app;
