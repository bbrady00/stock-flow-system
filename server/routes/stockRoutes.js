import express from "express";
import { addMovement, getMovements } from "../controllers/stockController.js";

const router = express.Router();

router.post("/", addMovement);
router.get("/", getMovements);

export default router;
