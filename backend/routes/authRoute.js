import express from "express";
import { authUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", authUser);

export default router;
