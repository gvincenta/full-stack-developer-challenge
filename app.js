var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 

//db setup
require("./server/models/db.js");

//routes import
var indexRouter = require('./server/routes/index');
var bookRouter = require('./server/routes/book');
var booksRouter = require('./server/routes/books');
var authorRouter = require('./server/routes/author');
var authorsRouter = require('./server/routes/authors');

var app = express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
//routes setup
app.use('/api', indexRouter);
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

//react setup 
app.use(express.static(path.join(__dirname, "/client/build")));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;