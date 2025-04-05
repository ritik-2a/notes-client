import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { validEmail } from "../utils/helper.js";
import { BASE_URL } from "../utils/helper.js";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      toast.error("Invalid Email");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message || "Login successfully!");
      localStorage.setItem("jwt", data.user.token);
      setToken(localStorage.getItem("jwt"));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors || "Failed to Login user. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4 overflow-hidden">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400 animate-fadeIn my-5">
        Welcome Back to NeoNotes
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl animate-fadeInSlow mt-4">
        Access your notes anytime, anywhere. Log in now to continue organizing
        your thoughts seamlessly.
      </p>

      {/* Animated Moving Balls */}
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

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 backdrop-blur-md bg-transparent flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16"></div>
        </div>
      )}

      <form
        className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg relative z-10 mt-7"
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Login
        </h1>

        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          className={`w-full ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-all duration-300 text-white py-2 rounded`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Tailwind Keyframes for Ball Animation and Loader */}
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

export default Login;
