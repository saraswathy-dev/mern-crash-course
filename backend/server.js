import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Product from "./models/products.model.js";
dotenv.config();

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Name ,image and price are required",
    });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000 ");
  connectDB();
});
