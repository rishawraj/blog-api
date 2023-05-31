const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

//* todo get all posts
exports.posts = (req, res) => {
  Post.find().then((posts) => {
    return res.json(posts);
  });
};

// get public posts
exports.public_post = (req, res) => {
  Post.find({ published: true }).then((posts) => {
    return res.json(posts);
  });
};

//* todo create post
exports.create_post = [
  body("title", "title is required").trim().isLength({ min: 1 }).escape(),
  body("content", "content is required").trim().isLength({ min: 1 }).escape(),

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
      author: "raj",
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

//* todo publish post
//* todo unpublish post

//todo like post
//todo get post likes
