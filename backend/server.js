import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
dotenv.config();
console.log(process.env.MONGO_URI);
app.get("/products", (req, res) => {
  res.send("Hello, World!");
});
app.listen(5000, () => {
  console.log("Server is running on port 5000 ");
  connectDB();
});
//bqqtNAUHANKYHtnX
