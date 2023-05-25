import React from "react";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    minute: "2-digit",
    hour: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

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
      <p>
        <i>{formatDate(post.timestamp)}</i>
      </p>

      <p>{post.author}</p>
      <p>{post.content}</p>
      <Link to={`/post/${post._id}`}> Go to Post</Link>
    </div>
  );
}

export default PostCard;
