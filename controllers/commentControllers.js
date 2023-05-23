const { body, validationResult } = require("express-validator");
// const Post = require("../models/comment");
const Comment = require("../models/comment");

exports.comments = (req, res) => {
  res.send(req.params);
};

exports.get_comment = (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.create_comment = [
  body("username", "username is required").trim().isLength({ min: 1 }).escape(),
  body("content", "content is required").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }

    const newComment = new Comment({
      username: req.body.username,
      content: req.body.content,
      timestamp: Date.now(),
      postId: req.body.postId,
    });

    newComment
      .save()
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        res.json(err);
      });
  },
];

exports.delete_comment = (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      res.json({ message: "Commente Deleted!", comment });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.edit_comment = [];

// exports.get_comment = (req, res) => {};
