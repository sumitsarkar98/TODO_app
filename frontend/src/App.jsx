import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Notfound404 from "./screens/Notfound404";
import Landing from "./screens/Landing";

const App = () => {
  return (
    <Router>
      <>
        <Toaster position="bottom-center" reverseOrder={false} />{" "}
        {/* Add Toaster */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound404 />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
