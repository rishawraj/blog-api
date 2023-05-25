import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import PostCard from "./PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => {
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
    <div style={{ width: "70%", marginInline: "auto" }}>
      <Navbar />

      <div>
        <h1>Posts</h1>
        {posts.map((post, i) => {
          return <PostCard key={i} post={post} />;
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
