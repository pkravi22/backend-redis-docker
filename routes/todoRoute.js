import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createTodo, updateTodo } from "../controllers/todo.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTodo);
router.put("/update/:todoId", isAuthenticated, updateTodo);
export default router;
