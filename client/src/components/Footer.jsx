import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <i className="fa fa-facebook"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
        <i className="fa fa-youtube"></i>
      </div>

      <div className={styles.footerContent}>
        <p>BLOGSTATIC</p>
      </div>

      <p className={styles.footerText}>
        © 2023 Rishaw Raj. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
