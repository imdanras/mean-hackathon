var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  snippet: String,
  image: String
});

module.exports = mongoose.model('Post', PostSchema);
