import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { validEmail, validPassword } from "../utils/helper.js";
import { BASE_URL } from "../utils/helper.js";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!validPassword(password)) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }

    try {
      // Request OTP before creating the user
      const { data } = await axios.post(
        `${BASE_URL}/api/otp/send-otp`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message || "OTP sent to your email!");

      // Navigate to OTP verification page with email and user details
      navigate("/otp-verify", { state: { username, email, password } });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send OTP.");
      navigate("/login")
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4 overflow-hidden">
      <Toaster />

      <form
        className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg relative z-10"
        onSubmit={handleRequestOtp}
      >
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded"
          type="submit"
        >
          Get OTP
        </button>

        <p className="text-center text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
