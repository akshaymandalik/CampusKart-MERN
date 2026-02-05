import { emailSchema, passwordSchema } from "../utils/validationTypes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/env" });

export const validateUserSchema = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let emailErrors = [];
    let passwordErrors = [];

    const emailResult = emailSchema.safeParse(username);

    if (!emailResult.success) {
      const parsedErrors = JSON.parse(emailResult.error);

      parsedErrors.forEach((err) => {
        emailErrors.push(err.message);
      });
    }

    const passwordResult = passwordSchema.safeParse(password);

    if (!passwordResult.success) {
      const parsedErrors = JSON.parse(passwordResult.error);

      parsedErrors.forEach((err) => {
        passwordErrors.push(err.message);
      });
    }

    if (emailErrors.length || passwordErrors.length) {
      return next({
        status: 400,
        name: "validationError",
        errors: {
          emailErrors,
          passwordErrors,
        },
      });
    }

    next();
  } catch (e) {
    return next({
      status: 500,
      name: "Internal Server Error",
      errors: {
        error: [e],
      },
    });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header.authorization;
    if (!authHeader) {
      return next({
        status: 401,
        name: "authorizationError",
        errors: {
          error: ["Authorization Header Missing"],
        },
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next({
        status: 401,
        name: "authorizationError",
        errors: {
          error: ["Invalid token format"],
        },
      });
    }

    const user = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = user;
    next();
  } catch (e) {
    return next({
      status: 500,
      name: "Internal Server Error",
      errors: {
        error: [e],
      },
    });
  }
};
