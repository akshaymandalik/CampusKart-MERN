import { encyptPass, verifyPass } from "../utils/encrypt.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

export const signup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        name: "authorizationError",
        error: ["User Already Exists!"],
      });
    }

    const encryptedPass = await encyptPass(password);
    const user = new User({
      username: username,
      password: encryptedPass,
    });

    await user.save();

    res.status(200).json({
      status: 200,
      name: "authorizationSuccess",
      success: ["User Registered!"],
    });
  } catch (error) {
    return next({
      status: 500,
      name: "Internal Server Error",
      error: ["Something Went Wrong!"],
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(409).json({
        status: 409,
        name: "authorizationError",
        error: ["User Does not Exists!"],
      });
    }

    const validPass = await verifyPass(existingUser.password, password);
    if (!validPass) {
      return res.status(401).json({
        status: 401,
        name: "authorizationError",
        error: ["Invalid Password"],
      });
    }

    const user = {
      username: username,
      password: existingUser.password,
    };

    var privateKey = process.env.JWTSECRETKEY;
    var token = jwt.sign(user, privateKey);

    res.status(200).json({
      status: 200,
      name: "authorizationSuccess",
      success: ["Login Successfull"],
      token,
    });
  } catch (error) {
    return next({
      status: 500,
      name: "Internal Server Error",
      error: ["Something Went Wrong!"],
    });
  }
};

export const isUserExist = async (req, res, next) => {
  try {
    const username = req.body.username;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(409).json({
        status: 409,
        name: "authorizationError",
        error: ["User Does not Exists!"],
      });
    }
    res.status(200).json({
      status: 200,
      name: "authorizationSuccess",
      success: ["User Exists!"],
    });
  } catch (error) {
    return next({
      status: 500,
      name: "Internal Server Error",
      error: ["Something Went Wrong!"],
    });
  }
};
