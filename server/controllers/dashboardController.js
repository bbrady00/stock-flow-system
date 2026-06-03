import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import Location from "../models/Location.js";
import Inventory from "../models/Inventory.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalLocations = await Location.countDocuments();

    const totalMovements = await StockMovement.countDocuments();

    const lowStockProducts = await Product.find({
      totalStock: { $lt: 5 },
    });

    const incomingProducts = await Inventory.find({
      incomingStock: { $gt: 0 },
    });

    const reservedProducts = await Inventory.find({
      offsiteReserved: { $gt: 0 },
    });

    res.json({
      totalProducts,
      totalLocations,
      totalMovements,
      lowStockProducts,
      incomingProducts,
      reservedProducts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
