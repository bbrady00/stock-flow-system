import express from "express";
import {
  getLocations,
  createLocation,
} from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getLocations);
router.post("/", protect, createLocation);

export default router;
