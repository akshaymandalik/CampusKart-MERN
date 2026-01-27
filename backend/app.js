import express from "express";
import { connectDB } from "./models/connection.js";
import authRoutes from "./routers/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectDB();
app.use(cors());
app.use("/api/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
