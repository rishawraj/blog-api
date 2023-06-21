import React, { useState } from "react";

function CommentForm({ id, setCounter }) {
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleClick = () => {
    setNotification("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwttoken");

    console.log(token);

    if (localStorage.getItem("jwttoken") === null) {
      setNotification("Please Login First");
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
      {notification && (
        <div
          style={{
            backgroundColor: "lightpink",
            display: "flex",
            justifyContent: "space-between",
            marginBlock: "10px",
            padding: "5px",
          }}
        >
          {notification}
          <button onClick={handleClick}>x</button>
        </div>
      )}

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
    </div>
  );
}

export default CommentForm;
