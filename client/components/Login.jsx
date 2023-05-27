import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((token) => {
        console.log(token);
        console.log(token.token);
        localStorage.setItem("jwttoken", token.token);
      });

    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <>
      <div style={{ width: "70%", marginInline: "auto" }}>
        <Navbar />
        <Link to="/signup"> Sign Up</Link>
        <br />
        <hr />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
