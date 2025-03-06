import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../utils/helper";

const OTPVerifyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email, password } = location.state || {};

  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/otp/verify-otp`,
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(data.message || "OTP Verified! Creating account...");
      // Now create the user after successful OTP verification
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/signup`,
          { username, email, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        // Show success toast
        console.log(data);
        toast.success(data.message || "Registered successfully!");
        navigate("/login");
      } catch (error) {
        toast.error(
          error.response?.data?.errors || "Failed to register user. Try again!"
        );
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP. Try again.");
      navigate("/login")
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4 overflow-hidden">
      <Toaster />
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg relative z-10">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
          Enter OTP sent to {email}
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-2 rounded"
        >
          Verify OTP & Signup
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-2 rounded mt-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPVerifyForm;
