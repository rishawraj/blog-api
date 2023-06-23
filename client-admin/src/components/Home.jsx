import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostEdit from "./PostEdit";
import Navbar from "./Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, [counter]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setUsers(data);
      });
  }, []);

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
                {post.published ? (
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleSubmit2(post._id)}
                  >
                    unpublish
                  </button>
                ) : (
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => handleSubmit(post._id)}
                  >
                    publish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* list users */}
      <h1>Users</h1>
      <p>Number of Users: {users.length}</p>

      {users.map((user, i) => {
        return (
          <div key={i} style={{ backgroundColor: "lightcoral" }}>
            <p>ID: {user._id}</p>
            <p>
              Name: <b>{user.username}</b>
            </p>
          </div>
        );
      })}
    </>
  );
}

export default Home;
