import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// import { Editor } from "tinymce";

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
        navigate("/");
      });
  };

  return (
    <>
      <Navbar />
      <div>PostEdit</div>
      <p>{id}</p>
      <hr />
      <div>
        <h3>{title}</h3>
        <pre>{content}</pre>
      </div>

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
        <hr />

        <hr />

        <br />
        <button type="submit">submit</button>
        <button onClick={() => navigate("/")}>cancel</button>
      </form>

      <hr />
    </>
  );
}

export default PostEdit;
