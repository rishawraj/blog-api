import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import Post from "../components/Post";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}
