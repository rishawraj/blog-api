import Navbar from "./Navbar";
import styles from "../styles/HeroTop.module.css";

const HeroTop = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <p>BLOGSTATIC</p>
          <p id={styles.simple}> Simplicity</p>
        </div>
        <div className={styles.logo}>
          <h3>logo</h3>
        </div>
      </div>
    </>
  );
};

export default HeroTop;
