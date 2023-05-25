const { body, validationResult } = require("express-validator");
// const Post = require("../models/comment");
const Comment = require("../models/comment");

// !
exports.comments = (req, res) => {
  Comment.find({ post: req.params.id })
    .sort({ timestamp: -1 })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
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

// create
// commentsRouter.post("/:id", commentController.create_comment);

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
      post: req.params.id,
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
