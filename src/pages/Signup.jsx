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
  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Start showing loader

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/otp/send-otp`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message || "OTP sent to your email!");
      navigate("/otp-verify", { state: { username, email, password } });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send OTP.");
      navigate("/login");
    } finally {
      setLoading(false); // Stop showing loader
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4 overflow-hidden">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400 animate-fadeIn my-5">
        Join NeoNotes Today!
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl animate-fadeInSlow my-5">
        Get started with smart note-taking. Sign up now and experience
        effortless organization.
      </p>

      {/* Animated Background Balls */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-75 animate-ball"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* Loading Spinner with Blur */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16"></div>
        </div>
      )}

      <form
        className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg relative z-10 m-y-7"
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
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition-all duration-300 text-white py-2 rounded`}
        >
          {loading ? "Sending OTP..." : "Get OTP"}
        </button>

        <p className="text-center text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>

      {/* Custom Styles for Ball Animation & Loader */}
      <style>
        {`
          @keyframes moveBalls {
            0% {
              transform: translateY(0px) translateX(0px);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-50px) translateX(30px);
              opacity: 0.6;
            }
            100% {
              transform: translateY(0px) translateX(0px);
              opacity: 0.8;
            }
          }
          .animate-ball {
            animation: moveBalls 5s infinite alternate ease-in-out;
          }

          .loader {
            border-top-color: #00bfff;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
