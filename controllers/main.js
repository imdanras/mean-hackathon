var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('in the controller');
});

module.exports = router;
