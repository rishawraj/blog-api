import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import Post from "../components/Post";
import Login from "../components/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}
