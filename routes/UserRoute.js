// routes/userRoutes.js
import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//router.get("/users", getAllusers);

export default router;
