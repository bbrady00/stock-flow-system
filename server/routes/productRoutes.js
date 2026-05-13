import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/", deleteProduct);

export default router;
