var express = require('express');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var { MongoClient } = require('mongodb'); // Include MongoDB client

// MongoDB setup
var mongoUri = process.env.MONGO_URI; // Use environment variable for MongoDB URI
var mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    var db = mongoClient.db();
    // Make collections globally available
    global.messagesCollection = db.collection('messages');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

// Connect to MongoDB
connectToMongo();

// The rest of your existing app.js code...
var indexRouter = require('./routes/index');
var app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Confirming we're using EJS as our view engine

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
