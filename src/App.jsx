import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import Demo from "./pages/Demo";
import OTPVerifyForm from "./components/OTPVerifyForm";

function App() {
  const [searchQuery, setSearchQue] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [email, setEmail] = useState("");

  return (
    <BrowserRouter>
      <Navbar setSearchQue={setSearchQue} setToken={setToken} />
      <Routes>
        {/* Redirect to OTP Authentication if token is null */}
        <Route
          path="/"
          element={token ? <Home searchQuery={searchQuery} /> : <Demo />}
        />

        {/* OTP Authentication Routes */}

        <Route path="/otp-verify" element={<OTPVerifyForm email={email} />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 Page */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
