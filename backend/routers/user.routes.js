import express from "express";
import { encyptPass } from "../utils/encrypt.js";
import { emailSchema, passwordSchema } from "../utils/validationTypes.js";

const router = express.Router();


export default router;
