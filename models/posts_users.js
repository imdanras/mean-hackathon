var mongoose = require('mongoose');

var PostsUsersSchema = mongoose.Schema({
  userId: String,
  postId: String
});

module.exports = mongoose.model('PostsUsers', PostsUsersSchema);
