import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port ", +PORT);
  connectDB();
});
