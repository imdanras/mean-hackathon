var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.sendFile(__dirname + '/views/main.html');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
