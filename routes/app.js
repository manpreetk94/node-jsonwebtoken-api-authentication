var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var restaurantRouter = require('./routes/restaurent');

var authenticate = require('./routes/authenticate');
const bodyParser    =         require("body-parser");
var app = express();
var fileUpload      =       require('express-fileupload');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');




app.use(logger('dev'));
/*app.use(express.json());
app.use(express.urlencoded({ extended: true }));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.all('*', authenticate.loginRequired);
app.use('/',restaurantRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('err.message',err.message)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
