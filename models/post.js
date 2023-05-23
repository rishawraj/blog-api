const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  content: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  author: { type: String, required: true },
  comments: { type: Array, default: [] },
  published: { type: Boolean },
  timestamp: { type: Date },
  imgUrl: { type: String },
  likes: { type: Array, default: [] },
});

module.exports = mongoose.model("Post", PostSchema);
