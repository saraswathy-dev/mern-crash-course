import express from "express";
import {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//get all products
router.get("/", getProducts);
// create products
router.post("/", createProducts);
//update product
router.put("/:id", updateProduct);
//delete product
router.delete("/:id", deleteProduct);
export default router;
