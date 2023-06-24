import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Post from "./components/Post";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
