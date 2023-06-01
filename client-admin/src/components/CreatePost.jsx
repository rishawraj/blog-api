import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content === "") {
      alert("content cannot be empty!");
      return;
    }

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
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <Editor
          apiKey="gs3fqut22bhrqy33bcubhbf4ooe6mvg88ulbx19nciffywb4"
          textareaName="content"
          value={content}
          onEditorChange={(newText) => {
            console.log(content);
            setContent(newText);
          }}
          init={{ height: 500, menubar: false }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default CreatePost;
