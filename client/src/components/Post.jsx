import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";

function Post() {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(0);
  const [likeCounter, setLikeCounter] = useState(0);

  const handleLike = () => {
    console.log("like");

    // postid
    console.log(id);

    // // userid
    // const user = JSON.parse(localStorage.getItem("user"));
    // const userId = user._id;

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      toast.error("Please Login before liking");
      return;
    }

    fetch(`/api/posts/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        postId: id,
        // userId: userId,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success(data.message);
      });

    setLikeCounter(likeCounter + 1);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
        setPostData(data);
        setLikeCounter(data.likes.length);
      });
  }, [likeCounter]);

  useEffect(() => {
    fetch(`/api/comments/${id}`)
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
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <p>Likes {likeCounter}</p>
          <button onClick={handleLike}>like</button>
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
