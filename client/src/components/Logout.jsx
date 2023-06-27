import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/Logout.module.css";

function Logout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleClick = () => {
    fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          res.json({ err: "err 68" });
        }
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    localStorage.removeItem("jwttoken");
    localStorage.removeItem("user");
    sessionStorage.setItem("successMessage", "Logout Successfull");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Logout</h1>
        {user && (
          <>
            <p>Username: {user.username}</p>
            <button onClick={handleClick}>Log Out</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Logout;
