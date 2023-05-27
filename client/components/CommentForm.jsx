import React, { useState } from "react";

function CommentForm({ id, setCounter }) {
  const [username, setUsername] = useState(localStorage.getItem("jwttoken"));
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${username}`,
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
        console.log(json);
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
        <br />
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
    </div>
  );
}

export default CommentForm;
