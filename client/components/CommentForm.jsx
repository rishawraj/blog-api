import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function CommentForm({ id, setCounter }) {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwttoken");

    console.log(token);

    if (localStorage.getItem("jwttoken") === null) {
      toast.error("Please Login First");
      return;
    }

    fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((json) => {
        toast.error(json.error);
        setContent("");
        setCounter();
      });
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        border: "2px solid black",
        padding: "10px",
      }}
    >
      <form onSubmit={handleSubmit}>
        {user && (
          <p>
            Username:{" "}
            <span style={{ fontWeight: "bold" }}>{user.username}</span>
          </p>
        )}
        <label htmlFor="message">Message: </label>
        <input
          type="text"
          name="message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">comment</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CommentForm;
