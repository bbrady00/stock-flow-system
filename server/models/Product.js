import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sku: String,
  name: String,
  category: String,
  totalStock: Number,
});

export default mongoose.model("Product", productSchema);
