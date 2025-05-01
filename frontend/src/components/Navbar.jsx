import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold">TodoApp</div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-200 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-200 transition">
          About
        </Link>
        <Link
          to="/login"
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
