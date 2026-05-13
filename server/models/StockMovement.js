import mongoose, { Schema } from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Svhema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    type: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    note: String,
  },
  { timestamps: true },
);

export default mongoose.model("StockMovement", stockMovementSchema);
