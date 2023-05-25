const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Boolean },
  timestamp: { type: Date },
  imgUrl: { type: String },
  likes: { type: Array, default: [] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
