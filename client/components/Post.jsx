import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Post() {
  const { id } = useParams();

  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);

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
  }, []);

  return (
    <>
      <div style={{ width: "70%", marginInline: "auto" }}>
        <Navbar />
        <div>
          <h1>{postData.title}</h1>
          <h3>{postData.author}</h3>
          <p>
            <i>{postData.timestamp}</i>
          </p>
          <p>{postData.content}</p>
        </div>
        <hr />
        <h3>Comments</h3>
        {comments.map((comment, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: "lightgray",
                padding: "10px",
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <h3>{comment.username}</h3>
                <p>{comment.content}</p>
              </div>
              <p>{comment.timestamp}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Post;
