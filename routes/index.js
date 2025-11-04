import express from "express";

import UserRoute from "./UserRoute.js";
import todoRoute from "./todoRoute.js";

const router = express.Router();

router.use("/user", UserRoute);
router.use("/todo", todoRoute);

export default router;
