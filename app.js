
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dummy = require( './routes/dummy' );
var auth = require( './routes/auth' );
var areatype = require( './routes/area_types' );
var cabintype = require( './routes/cabin_types' );
var cabin = require( './routes/cabin' );
var pool = require( './routes/pool' );
var area = require( './routes/area' );

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use( '/dummy', dummy );
app.use( '/auth', auth );
app.use( '/areatype', areatype );
app.use( '/cabintype', cabintype );
app.use( '/cabin', cabin );
app.use( '/pool', pool );
app.use( '/area', area );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
