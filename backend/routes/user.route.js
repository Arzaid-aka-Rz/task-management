import express from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",isAuthenticated,logout);

export default router;
