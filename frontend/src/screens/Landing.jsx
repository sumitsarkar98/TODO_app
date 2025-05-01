import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-4xl text-center mt-20 font-bold">
          Welcome to TodoApp
        </h1>
        <p className="text-center mt-4 text-lg">
          Manage your tasks efficiently!
        </p>
        <div className="flex justify-center mt-10">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
