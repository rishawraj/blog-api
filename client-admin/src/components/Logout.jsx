import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Logout() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e.target);
    localStorage.removeItem("admin");
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
