import express from "express";
import { addMovement, getMovements } from "../controllers/stockController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMovement);
router.get("/", getMovements);

export default router;
