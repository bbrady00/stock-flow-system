import Product from "../models/Product.js";

// GET
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
