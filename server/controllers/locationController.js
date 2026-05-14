import Location from "../models/Location.js";

export const getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

export const createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
