import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostEdit from "./PostEdit";
import Navbar from "./Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, [counter]);

  function handleSubmit(id) {
    fetch(`/api/posts/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: true }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request Failed!");
      })
      .then((data) => {
        setCounter(counter + 1);
      });
  }

  function handleSubmit2(id) {
    fetch(`/api/posts/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: false }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request Failed!");
      })
      .then((data) => {
        setCounter(counter + 1);
      });
  }

  return (
    <>
      <Navbar />
      <h1>Admin Posts</h1>

      <div
        style={{
          width: "70%",
          marginInline: "auto",
        }}
      >
        {posts.map((post, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: "cadetblue",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <div>
                <h3>{post.title}</h3>
                <p>Published: {post.published ? "true" : "false"}</p>
                <p>Img URL: {post.imgUrl}</p>
                <Link to={`/post/${post._id}`}>edit</Link>
              </div>

              <div>
                <button onClick={() => handleSubmit(post._id)}>publish</button>
                <button onClick={() => handleSubmit2(post._id)}>
                  unpublish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
