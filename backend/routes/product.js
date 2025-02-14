const express = require("express");
const auth = require("../middleware/auth");
const { Product, Store } = require("../models");

const router = express.Router();

// 📌 1. Add a Product to a Store
router.post("/", auth, async (req, res) => {
  try {
    const { name, price, description, image, storeId } = req.body;

    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    // Ensure the user owns the store
    if (store.ownerId !== req.user.id)
      return res.status(403).json({ msg: "Not authorized to add products" });

    const product = await Product.create({ name, price, description, image, storeId });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 2. Get All Products for a Store
router.get("/store/:storeId", async (req, res) => {
  try {
    const products = await Product.findAll({ where: { storeId: req.params.storeId } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 3. Update a Product
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    await product.update({ name, price, description, image });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 4. Delete a Product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    await product.destroy();
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// 📌 5. Get a Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
