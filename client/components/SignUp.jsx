import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

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

        if (user.errors) {
          user.errors.forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          setUsername("");
          setPassword("");
          setConfirmPassword("");

          sessionStorage.setItem("signUpMessage", "User Created Successfully!");
          navigate("/");
        }
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

        <form onSubmit={handleSubmit}>
          <br />
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            required
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="text"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
