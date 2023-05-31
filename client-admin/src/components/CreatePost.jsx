import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
        setTitle("");
        setContent("");
        navigate("/");
      });
  };

  return (
    <>
      <Navbar />
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title </label>
        <input
          type="text"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="content">Content </label>
        <br />

        <textarea
          rows="10"
          cols="100"
          type="text"
          name="content"
          value={content}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <br />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default CreatePost;
