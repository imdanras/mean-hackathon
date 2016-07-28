var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);

      return res.send(users);
    });
  })
  .post(function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
      if (user) return res.status(400).send({message: 'Email already exists'});

      User.create(req.body, function(err, user) {
        if (err) return res.status(500).send(err);


        return res.send(user);
      });
    });
  });

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(500).send(err);

    return res.send(user);
  });
});

module.exports = router;
