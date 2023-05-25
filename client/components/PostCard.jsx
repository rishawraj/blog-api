import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div
      style={{
        backgroundColor: "lightseagreen",
        padding: "20px",
        margin: "20px",
      }}
    >
      <h1>{post.title}</h1>
      <p>{post.author}</p>
      <p>{post.content}</p>
      <Link to={`/post/${post._id}`}> Go to Post</Link>
    </div>
  );
}

export default PostCard;
