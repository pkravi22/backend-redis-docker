import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createTodo, getALlTodo, updateTodo } from "../controllers/todo.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTodo);
router.put("/update/:todoId", isAuthenticated, updateTodo);
router.get("/", isAuthenticated, getALlTodo);
export default router;
