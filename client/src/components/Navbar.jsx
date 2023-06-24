import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

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
    <nav className={styles.navbar}>
      <div className="logo">
        <Link className={styles.link} to={"/"}>
          BLOGSTATIC
        </Link>
      </div>

      <div className="nav-links">
        <Link className={styles.button} to={"/login"}>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
