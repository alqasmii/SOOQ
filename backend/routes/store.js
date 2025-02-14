const express = require("express");
const auth = require("../middleware/auth"); // Protect routes with JWT
const { Store, User } = require("../models");

const router = express.Router();

// 📌 1. Create a Store
router.post("/", auth, async (req, res) => {
  try {
    const { name, customURL } = req.body;

    // Ensure user does not already have a store
    let existingStore = await Store.findOne({ where: { ownerId: req.user.id } });
    if (existingStore) return res.status(400).json({ msg: "User already has a store" });

    // Create new store
    const store = await Store.create({ name, ownerId: req.user.id, customURL });
    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 2. Get Store Details
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, { include: User });
    if (!store) return res.status(404).json({ msg: "Store not found" });

    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// 📌 Get store by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.params.userId } });
    if (!store) return res.status(404).json({ msg: "No store found for this user" });
    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
