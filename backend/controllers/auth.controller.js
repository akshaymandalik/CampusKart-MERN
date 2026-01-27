import { encyptPass } from "../utils/encrypt.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({ path: "../config/.env" });


export const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.json({
      status: 409,
      message: "User Already Exists!",
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
    message: "User Registered!",
  });
};

export const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;  

  const existingUser = await User.findOne({ username });
  
  if (!existingUser) {
    return res.status(409).json({
      status: 409,
      error: "User Does not Exists!",
    });
  }

  const user = {
    username: username, 
    password: password,
  }

  var privateKey = process.env.JWTSECRETKEY;
  var token = jwt.sign(user, privateKey);

  res
    .status(200)
    .json({
      message: "Login Successfull",
      token,
  })
};
