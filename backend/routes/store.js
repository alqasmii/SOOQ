const express = require("express");
const auth = require("../middleware/auth");
const { Store, User } = require("../models");

const router = express.Router();

// Create a Store (Requires Auth)
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    // Ensure user exists
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    // Ensure user does not already have a store
    const existingStore = await Store.findOne({ where: { ownerId: req.user.id } });
    if (existingStore)
      return res.status(400).json({ msg: "User already has a store" });
    // Create store
    const store = await Store.create({ name, ownerId: req.user.id });
    res.json(store);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

// Get Store by User ID
router.get("/user/:userId", async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.params.userId } });
    if (!store) return res.status(404).json({ msg: "No store found for this user" });
    res.json(store);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
