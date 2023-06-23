const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

//* todo get all posts
exports.posts = (req, res) => {
  Post.find()
    .sort({ timestamp: -1 })
    .then((posts) => {
      return res.json(posts);
    })
    .catch((err) => {
      console.error("Error retrieving all posts", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// get public posts
exports.public_post = (req, res) => {
  Post.find({ published: true })
    .then((posts) => {
      return res.json(posts);
    })
    .catch((err) => {
      console.error("Error retrieving public posts", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

//* todo create post
exports.create_post = [
  body("title", "title is required").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    console.log(req.body);
    const { title, content, imgUrl } = req.body;

    const newPost = new Post({
      title,
      content,
      author: "Rishaw Raj",
      published: false,
      timestamp: Date.now(),
      imgUrl: imgUrl,
    });

    newPost
      .save()
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.json(err);
      });
  },
];

//* todo get a single post
exports.get_post = (req, res) => {
  Post.findById(req.params.id)
    .populate("comments") //key
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// * todo delete post
exports.delete_post = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      res.json({ message: `Post with Id: ${req.params.id} deleted.`, post });
    })
    .catch((err) => {
      res.json(err);
    });
};

//todo update post
exports.update_post = (req, res) => {
  const postId = req.params.id;
  const updatedData = req.body;

  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] === "") {
      delete updatedData[key];
    }
  });

  Post.findByIdAndUpdate(postId, updatedData, { new: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found!" });
      }
      res.json(updatedPost);
    })
    .catch((err) => {
      console.error("Error updating post", err);
      res.status(404).json({ error: "Internal Server Error" });
    });
};

//todo like post
exports.like = (req, res) => {
  const userId = req.user.id;
  const postId = req.body.postId;

  Post.findById(postId).then((post) => {
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      // Remove the user ID from the likes array
      post.likes = post.likes.filter((id) => id !== userId);

      return post.save();
    }

    // Add the user ID to the likes array
    post.likes.push(userId);

    try {
      post.save();
      return res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to like the post", error });
    }
  });
};
