var express = require('express');
var Post = require('../models/post');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Post.find(function(err, posts) {
      if (err) return res.status(500).send(err);

      return res.send(posts);
    });
  })
  .post(function(req, res) {
    Post.create(req.body, function(err, post) {
      if (err) return res.status(500).send(err);

      return res.send(post);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Post.findById(req.params.id, function(err, post) {
      if (err) return res.status(500).send(err);

      return res.send(post);
    });
  })
  .put(function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({message: 'success'});
    });
  })
  .delete(function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({message: 'success'});
    });
  });

module.exports = router;
