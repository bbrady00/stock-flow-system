import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: String,
    totalStock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
