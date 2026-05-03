import mongoose, { Schema } from "mongoose";

const stockMovementSchema = new mongoose.Schema({
  productID: String,
  type: String,
  quantity: Number,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("StockMovement", stockMovementSchema);
