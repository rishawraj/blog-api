const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, maxLength: 30, required: true },
  content: { type: String, required: true },
  postId: { type: String, required: true },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Comment", CommentSchema);
