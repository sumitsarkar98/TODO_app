import express from "express";
import { requireAuth } from "../authentication/user.auth.js";
import { register, login, logout } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);

export default router;
