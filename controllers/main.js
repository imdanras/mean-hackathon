var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('in the controller');
});

// router.get('/signup', function(req, res) {
//   res.send()
// })
module.exports = router;
