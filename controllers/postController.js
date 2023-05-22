const Post = require("../models/post");

exports.posts = (req, res) => {
  Post.find().then((data) => res.json(data));
};

exports.post_get = (req, res) => {
  res.json(req.params.postId);
};
