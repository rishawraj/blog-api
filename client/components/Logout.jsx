import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Logout() {
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <h1>Logout</h1>
      <button onClick={handleClick}>logout</button>
    </>
  );
}

export default Logout;
