const express = require("express");
const commentsRouter = express.Router();
const commentController = require("../controllers/commentControllers");

// app.use("/api/posts/:postId/comments", commentsRouter);

commentsRouter.get("/:id", commentController.comments);

// create comment
commentsRouter.post("/:id", commentController.create_comment);

commentsRouter.get("/:id", commentController.get_comment);

commentsRouter.delete("/:id/delete", commentController.delete_comment);

module.exports = commentsRouter;
