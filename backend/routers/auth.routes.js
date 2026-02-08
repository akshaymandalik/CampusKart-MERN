import express from "express";
import { signup, signin, isUserExist } from "../controllers/auth.controller.js";
import { validateUserSchema } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateUserSchema, signup);
router.post("/signin", signin);
router.post("/isUserExist", isUserExist);

export default router;
