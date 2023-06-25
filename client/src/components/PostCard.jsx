import React from "react";
import styles from "../styles/PostCard.module.css";

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

const truncateStrign = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

function PostCard({ post }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.imageContainer}>
        <img src="./post-image.jpg" alt="post-image" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{post.title}</h3>
        {/* <p className={styles.date}>
          <i>{formatDate(post.timestamp)}</i>
        </p> */}
        {/* <p>{post.author}</p> */}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: truncateStrign(post.content, 200),
          }}
        ></div>
      </div>
    </div>
  );
}

export default PostCard;
