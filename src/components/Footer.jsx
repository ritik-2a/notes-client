import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 px-4 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Logo & Copyright */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold tracking-wide text-blue-400">
            NeoNotes
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} NeoNotes. All Rights Reserved.
            
          </p>
          <div className="text-center text-gray-400 bg-gray-900 animate-fadeIn">
            <p className="flex justify-center items-center gap-2">
              <span className="text-white font-semibold">
              Crafted with passion & precision by Ritik K.
              </span>
              <span className="animate-bounce">👨‍💻</span>
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          {[
            {
              icon: <FaFacebookF />,
              link: "https://www.facebook.com/profile.php?id=100029380850626",
            },
            {
              icon: <FaTwitter />,
              link: "https://x.com/Ritiklll13?t=oOuzv9Kb2yTIL1TXJAarBA&s=09",
            },
            {
              icon: <FaInstagram />,
              link: "https://www.instagram.com/chaudharyritik.21?igsh=cGo5eng4YXZjMDZ6",
            },
            {
              icon: <FaLinkedinIn />,
              link: "https://www.linkedin.com/in/ritik2a/",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 shadow-md"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
