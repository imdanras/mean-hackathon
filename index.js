var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// JSON web token dependencies
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

// Mongoose stuff
var mongoose = require('mongoose');
var User = require('./models/user');
var Post = require('./models/post');
var PostsUsers = require('./models/posts_users');
mongoose.connect('mongodb://localhost/ensembleNews');

// decode POST data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

app.use('/main', require('./controllers/main'));

// Checking JSON web tokens with middleware, before passing along to controllers
app.use('/api/posts', expressJWT({secret: secret}), require('./controllers/posts'));
app.use('/api/users', expressJWT({secret: secret}).unless({path: ['/api/users'], method: 'post'}), require('./controllers/users'));

// Middleware to check if expressJWT did not authorize the user
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need an authorization token to view this information'});
  }
});

// POST /api/auth - if authenticated, return a signed JWT
app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});

    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);

      return res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
