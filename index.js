var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

app.use('/main', require('./controllers/main'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
