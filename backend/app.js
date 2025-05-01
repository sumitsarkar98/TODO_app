import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Creating app using express
const app = express();

// Setup CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// Enable cookie parsing
app.use(cookieParser());

// Setting limit for JSON when form submitting
app.use(express.json({ limit: "50kb" }));
// Handling data coming from URL
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
// Storing img/files on server if needed
app.use(express.static("public"));

// Routes import
import todoRouter from "./src/routes/todo.routes.js";
import userRouter from "./src/routes/user.routes.js";

// Basic route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Todo API");
});

// Use routers
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

// Exporting app
export { app };
