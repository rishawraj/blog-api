const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// app.use("/api/posts", postsRouter);

// GET all posts
router.get("/", postController.posts);

// get all public posts
router.get("/public", postController.public_post);

// POST create post
router.post("/create", postController.create_post);

// GET single post
router.get("/:id", postController.get_post);

// DELETE delete post
router.delete("/:id/delete", postController.delete_post);

// PUT update post
router.put("/:id/edit", postController.update_post);

// // POST publish post
// router.post("/:id/publish", verifyToken, postController.publish);

// // POST unpublish post
// router.post("/:id/unpublish", verifyToken, postController.unpublish);

// // get post likes
// router.get("/:id/likes", postController.likes);

// // like post
// router.put("/:id/like", verifyToken, postController.like);

module.exports = router;
