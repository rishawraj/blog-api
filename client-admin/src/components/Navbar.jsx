import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
      </nav>
    </>
  );
}

export default Navbar;
