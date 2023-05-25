import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " | " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/posts/${id}/edit`, {
      method: "PUT",
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
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  };

  return (
    <>
      <Navbar />
      <div>PostEdit</div>
      <p>{id}</p>

      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title </label>
        <br />
        <br />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <br />
        {/* <label htmlFor="content">Content </label> */}
        <textarea
          rows="10"
          cols="70"
          type="textarea"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default PostEdit;
