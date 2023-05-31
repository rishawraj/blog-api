import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("admin"));

  return (
    <>
      <nav
        style={{
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/post/create">Create New Post</Link>
        {user ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;
