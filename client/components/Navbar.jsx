import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "lightcoral",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
    </nav>
  );
}

export default Navbar;
