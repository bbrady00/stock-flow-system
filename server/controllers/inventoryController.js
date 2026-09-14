import Inventory from "../models/Inventory.js";

//GET Inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate("productId")
      .populate("locationId");

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE or UPDATE Inventory

export const updateInventory = async (req, res) => {
  try {
    const { productId, locationId, quantity } = req.body;

    if (!productId || !locationId) {
      return res.status(400).json({
        error: "Product and location are required",
      });
    }

    if (Number(quantity) < 0) {
      return res.status(400).json({
        error: "Quantity cannot be negative",
      });
    }

    const inventory = await Inventory.findOneAndUpdate(
      {
        productId,
        locationId,
      },
      {
        quantity,
      },
      {
        new: true,
        upsert: true,
      },
    )
      .populate("productId")
      .populate("locationId");

    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
