import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";

// ADD
export const addMovement = async (req, res) => {
  try {
    const { productId, type, quantity, fromLocation, toLocation } = req.body;

    if (!productId || !type || !quantity) {
      return res.status(400).json({
        error: "Product, type and quantity are required",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        error: "Quantity must be greater than 0",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (type === "IN") {
      if (!toLocation) {
        return res.status(400).json({
          error: "Destination location is required for incoming stock",
        });
      }

      await Inventory.findOneAndUpdate(
        {
          productId,
          locationId: toLocation,
        },
        {
          $inc: { quantity },
        },
        {
          new: true,
          upsert: true,
        },
      );

      product.totalStock += quantity;
    }

    if (type === "OUT") {
      if (!fromLocation) {
        return res.status(400).json({
          error: "Source location is required for outgoing stock",
        });
      }

      const inventory = await Inventory.findOne({
        productId,
        locationId: fromLocation,
      });

      if (!inventory || inventory.quantity < quantity) {
        return res.status(400).json({
          error: "Insufficient stock at this location",
        });
      }

      inventory.quantity -= quantity;
      await inventory.save();

      product.totalStock -= quantity;
    }

    await product.save();

    const movement = await StockMovement.create({
      productId,
      type,
      quantity,
      fromLocation,
      toLocation,
    });

    res.status(201).json(movement);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// GET
export const getMovements = async (req, res) => {
  const movements = await StockMovement.find().populate("productId");
  res.json(movements);
};
