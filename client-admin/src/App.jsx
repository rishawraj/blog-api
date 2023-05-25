import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PostEdit from "./components/PostEdit";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostEdit />} />
        <Route path="/post/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
