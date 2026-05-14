import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";

// ADD
export const addMovement = async (req, res) => {
  try {
    const { productId, type, quantity, fromLocation, toLocation } = req.body;

    const movement = await StockMovement.create({
      productId,
      type,
      quantity,
      fromLocation,
      toLocation,
    });

    // UPDATE (temp)
    const product = await Product.findById(productId);

    if (type === "IN") {
      product.totalStock += quantity;
    } else {
      product.totalStock -= quantity;
    }

    await product.save();

    res.status(201).json(movement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET
export const getMovements = async (req, res) => {
  const movements = await StockMovement.find().populate("productId");
  res.json(movements);
};
