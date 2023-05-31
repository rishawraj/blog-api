import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "raj" && password === "1234") {
      localStorage.setItem("admin", JSON.stringify({ user: "raj" }));

      setUsername("");
      setPassword("");

      navigate("/");
      return;
    }

    setNotification("Bad Credentials");
  };

  return (
    <>
      <Navbar />
      <h1>Login</h1>
      {notification && (
        <div
          style={{
            backgroundColor: "pink",
            border: "1px solid black",
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <p>{notification}</p>
          <button onClick={() => setNotification("")}>x</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>

        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <input type="submit" value="submit" />
      </form>
    </>
  );
}

export default Login;
