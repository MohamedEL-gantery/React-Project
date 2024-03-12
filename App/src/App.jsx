// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Post from "./components/Post";
import UpdatePost from "./components/UpdatePost";
import GetPost from "./components/GetPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/createPost" element={<Post />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/getPost/:id" element={<GetPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
