import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState({});

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "lightcoral",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={"/"}>Home</Link>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {user && (
          <p style={{ color: "cadetblue", fontWeight: "bold" }}>
            {user.username}
          </p>
        )}
        {user && <Link to={"/logout"}>Logout</Link>}
        {!user && <Link to={"/login"}>Login</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
