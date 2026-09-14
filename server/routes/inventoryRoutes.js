import express from "express";
import {
  getInventory,
  updateInventory,
} from "../controllers/inventoryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getInventory);
routes.put("/", protect, updateInventory);

export default router;
