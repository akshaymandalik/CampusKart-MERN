import express from "express";
import { signup,signin } from "../controllers/auth.controller.js";
import { validateUserSchema } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateUserSchema, signup);
router.post("/signin", validateUserSchema, signin);

export default router;
