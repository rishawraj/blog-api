import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/SignUp.module.css";
import Footer from "./Footer";

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
      <div className={styles.outer}>
        <Navbar />
        <div className={styles.content}>
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
