const { body, validationResult } = require("express-validator");
// const Post = require("../models/comment");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

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
  body("content", "content is required").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }

    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    console.log(token);

    if (token === undefined) {
      return res.json({ message: "Login first!" });
    }

    let obj;

    jwt.verify(token, "secret_key_0703", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.json({ error: "token expired!" });
          // return res.status(401).json({ error: "token expired" });

          // return res.json({ error: "token expired" });
          // throw new Error("Token expired");
        }

        return res.status(401).json({ error: "invalid token" });
      }

      obj = decoded;
    });

    let username = obj.username;

    const newComment = new Comment({
      username: username,
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

  //
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

//  delete all comments of a post
exports.delete_all = (req, res) => {
  Comment.deleteMany({ post: req.params.id })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error("Error deleting posts", err);
    });
};

// exports.get_comment = (req, res) => {};
