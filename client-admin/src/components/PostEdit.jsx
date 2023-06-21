import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Editor } from "@tinymce/tinymce-react";

// import { Editor } from "tinymce";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch(`/api/comments/${id}`)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, [counter]);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
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

    fetch(`/api/posts/${id}/edit`, {
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

  const handleClick = (id) => {
    console.log(id);
    fetch(`/api/comments/${id}/delete`, {
      method: "DELETE",
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
        setCounter(counter + 1);
      });
  };

  const handleDeletePost = () => {
    console.log(id);

    fetch(`/api/posts/${id}/delete`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`/api/comments/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <button onClick={handleDeletePost}>Delete Post</button>

      <form onSubmit={handleSubmit}>
        <br />
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

        <hr />

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

        <hr />

        <br />
        <button type="submit">submit</button>
        <button onClick={() => navigate("/")}>cancel</button>
      </form>

      <hr />
      <h1>Comments</h1>

      {comments.map((item) => (
        <div key={item._id} style={{ backgroundColor: "greenyellow" }}>
          <p>Username: {item.username}</p>
          <p>Content: {item.content}</p>
          <p>Timestamp: {item.timestamp}</p>
          <p>Post: {item.post}</p>
          <button onClick={() => handleClick(item._id)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default PostEdit;
