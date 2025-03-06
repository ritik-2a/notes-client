import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { getInitials } from "../utils/helper";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";
import { getFirst } from "../utils/helper";
import { BASE_URL } from "../utils/helper";

const Navbar = ({ setSearchQue, setToken }) => {
  const navigate = useNavigate();

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("jwt"); // Get token from storage
    if (!token) return null; // Return null if no token exists
    try {
      const [, payload] = token.split("."); // JWT has three parts: header, payload, signature
      const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 payload
      return decodedPayload.username || decodedPayload.name || null; // Extract username
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Usage
  const userName = getUsernameFromToken();

  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logout Successfully");
      localStorage.removeItem("jwt");
      setToken(null);
      navigate("/");
    } catch (error) {
      toast.error("logout error");
    }
  };

  const [searchQue, setsearchque] = useState("");

  const handleOnChange = (e) => {
    setSearchQue(e.target.value.toLowerCase());
    setsearchque(e.target.value);
  };

  const clearSearch = () => {
    setsearchque("");
    setSearchQue("");
  };

  return (
    //* Header-section
    <>
      <Toaster />
      <div className="bg-blue-400 flex items-center justify-between px-4 md:px-6 py-2 drop-shadow">
        {/* Logo */}
        <h2 className="text-lg md:text-xl font-medium text-black py-2 whitespace-nowrap">
          <span className="text-amber-900">Neo</span>
          <span className="font-bold">Notes</span>
        </h2>

        {/* Search Bar */}

        {userName && <div className="flex-1 max-w-[200px] sm:max-w-[250px] md:max-w-[320px] lg:max-w-[400px] flex items-center px-4 bg-slate-100 rounded-md mx-4">
          <input
            type="text"
            placeholder="Search note.."
            className="w-full text-xs bg-transparent py-[11px] outline-none"
            value={searchQue}
            onChange={(e) => handleOnChange(e)}
          />

          {searchQue && (
            <MdOutlineCancel
              className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
              onClick={clearSearch}
            />
          )}
          <IoIosSearch className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3" />
        </div>}

        {/* Profile Section */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {userName && userName.length > 0 ? (
              getInitials(userName)
            ) : (
              <IoMdLogIn />
            )}
          </div>

          <div className="text-sm font-medium hidden sm:block">
            {getFirst(userName)}
          </div>

          {userName && (
            <button
              className="text-sm bg-red-500 px-3 py-1 rounded-md text-white hover:opacity-80 cursor-pointer"
              onClick={logout}
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
