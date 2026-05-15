import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, createProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
