import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.dark("hi");

    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data.token) {
          localStorage.setItem("jwttoken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // dispatch an event
          window.dispatchEvent(new Event("storage"));
          setUsername("");
          setPassword("");
          sessionStorage.setItem("loginMessage", "Successfully Logged In!");
          navigate("/");
        } else {
          toast.error(data.message || "Invalid username or password");
        }
      });
  };

  return (
    <>
      <div style={{ width: "70%", marginInline: "auto" }}>
        <Navbar />
        <Link to="/signup"> Sign Up</Link>
        <br />
        <hr />
        <h1>Login</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            required
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
            required
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
      <Footer />
    </>
  );
}

export default Login;
