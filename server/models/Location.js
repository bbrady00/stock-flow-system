import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["STORE", "WAREHOUSE", "OFFSITE"],
      default: "STORE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Location", locationSchema);
