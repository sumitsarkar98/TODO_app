import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes
export const requireAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optional: console.log("Decoded JWT:", decoded);

    // Find user from token payload
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;

    // Move on to the next middleware/controller
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
