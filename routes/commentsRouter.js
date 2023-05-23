const express = require("express");
const commentsRouter = express.Router();
const commentController = require("../controllers/commentControllers");

commentsRouter.get("/", commentController.comments);

commentsRouter.post("/", commentController.create_comment);

commentsRouter.get("/:id", commentController.get_comment);

commentsRouter.delete("/:id/delete", commentController.delete_comment);

module.exports = commentsRouter;
