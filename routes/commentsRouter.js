const express = require("express");
const commentsRouter = express.Router();

commentsRouter.get("/", (req, res) => {
  res.send(req.params);
});

commentsRouter.get("/:id", (req, res) => {
  res.send(req.params);
});

module.exports = commentsRouter;
