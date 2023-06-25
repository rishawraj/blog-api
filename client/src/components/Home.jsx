import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

import Footer from "./Footer";
import PostCard from "./PostCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroTop from "./HeroTop";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loginMessage = sessionStorage.getItem("loginMessage");
    const logoutMessage = sessionStorage.getItem("successMessage");
    const signUpMessage = sessionStorage.getItem("signUpMessage");

    if (loginMessage) {
      toast.success(loginMessage);
      sessionStorage.removeItem("loginMessage");
    }

    if (logoutMessage) {
      toast.info(logoutMessage);
      sessionStorage.removeItem("successMessage");
    }

    if (signUpMessage) {
      toast.success(signUpMessage);
      sessionStorage.removeItem("signUpMessage");
    }
  }, []);

  useEffect(() => {
    fetch("/api/posts/public")
      .then((res) => {
        console.log(res);

        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
        console.log(posts);
      });
  }, []);

  return (
    <div className={styles.container}>
      <HeroTop />

      <div className={styles.postContainer}>
        {posts &&
          posts.map((post, i) => {
            return (
              <div key={i}>
                <Link to={`/post/${post._id}`}>
                  <PostCard post={post} />
                </Link>
              </div>
            );
          })}
      </div>

      <Footer />
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
    </div>
  );
}

export default Home;
