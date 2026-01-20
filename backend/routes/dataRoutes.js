const express = require("express");
const router = express.Router();
const DataItem = require("../models/DataItem");

// Get all data items
router.get("/", async (req, res) => {
  try {
    const items = await DataItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Get single data item
router.get("/:id", async (req, res) => {
  try {
    const item = await DataItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Data item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data item" });
  }
});

// Update data item
router.put("/:id", async (req, res) => {
  try {
    const item = await DataItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Data item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update data item" });
  }
});

// Delete data item
router.delete("/:id", async (req, res) => {
  try {
    const item = await DataItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Data item not found" });
    }
    res.json({ message: "Data item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete data item" });
  }
});

module.exports = router;
