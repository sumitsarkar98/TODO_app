import express from "express";
const router = express.Router();

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controllers.js";

import { requireAuth } from "../authentication/user.auth.js"; // ✅ ADD if using auth

// Protect all routes if they require user authentication
router.post("/createTodo", requireAuth, createTodo);
router.get("/fetchtodos", requireAuth, getTodos);
router.put("/todo/:id", requireAuth, updateTodo);
router.delete("/todo/:id", requireAuth, deleteTodo);

export default router;
