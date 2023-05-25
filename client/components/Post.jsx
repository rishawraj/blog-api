import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import CommentForm from "./CommentForm";

function Post() {
  const { id } = useParams();

  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        setPostData(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/comments/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        setComments(data);
      });
  }, [counter]);

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

  return (
    <>
      <div style={{ width: "70%", marginInline: "auto" }}>
        <Navbar />
        <div>
          <h1>{postData.title}</h1>
          <h3>{postData.author}</h3>
          <p>
            <i>{formatDate(postData.timestamp)}</i>
          </p>
          <p>{postData.content}</p>
        </div>
        <hr />
        <h3>Comments</h3>

        <CommentForm id={id} setCounter={setCounter} />

        <hr />

        {comments.map((comment, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: "lightgray",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <h3>{comment.username}</h3>
                <p>{comment.content}</p>
              </div>
              <p>{formatDate(comment.timestamp)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Post;
