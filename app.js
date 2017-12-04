var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var connection = require('./config/db');
var user = require('./app/routes/user');
var post = require('./app/routes/post');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

connection.init();
user.configure(app);
post.configure(app);


module.exports = app;