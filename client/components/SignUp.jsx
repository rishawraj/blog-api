import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status + " " + response.text);
        }
      })
      .then((user) => {
        console.log(user);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setMessage(user.message);
        setMessageStatus(!messageStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          width: "70%",
          marginInline: "auto",
          backgroundColor: "lightyellow",
        }}
      >
        <Navbar />
        <div>SignUp</div>

        <Link to="/login">Login</Link>
        {messageStatus && (
          <div
            style={{
              backgroundColor: "lightcoral",
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <div>{message}</div>

            <button
              onClick={() => {
                setMessageStatus(!messageStatus);
              }}
            >
              x
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <br />
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
