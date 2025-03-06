import { Link } from "react-router-dom";
import React from "react";
import pnf from "../assets/images/pagenotfound.jpg"; // Importing image

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 text-center">
      {/* Image Section */}
      <img
        src={pnf}
        alt="Page Not Found"
        className="w-60 md:w-80 lg:w-96 mt-6 rounded-lg shadow-2xl"
      />

      {/* Text Section */}
      <h2 className="text-3xl md:text-5xl font-bold text-red-400 mt-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-300 mt-2 max-w-md">
        The page you're looking for might have been removed or temporarily
        unavailable.
      </p>

      {/* Go Home Button */}
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
