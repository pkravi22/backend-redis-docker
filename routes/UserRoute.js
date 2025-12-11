// routes/userRoutes.js
import express from "express";
import { getALlUser, loginUser, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", isAuthenticated, getALlUser);
//router.get("/users", getAllusers);

export default router;
