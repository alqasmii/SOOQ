const express = require("express");
const auth = require("../middleware/auth"); // Protect routes with JWT
const { Order, Store, Product } = require("../models");

const router = express.Router();

// 📌 1. Place an Order
router.post("/", async (req, res) => {
  try {
    const { customerName, storeId, products, total, paymentMethod } = req.body;

    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    // Create Order
    const order = await Order.create({
      customerName,
      storeId,
      total,
      status: "pending",
      paymentMethod,
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 2. Get All Orders for a Store (For Store Owner)
router.get("/store/:storeId", auth, async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.storeId);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    if (store.ownerId !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    const orders = await Order.findAll({ where: { storeId: store.id } });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 3. Update Order Status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
const twilio = require("twilio");

// Twilio Credentials (Replace with actual credentials)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = new twilio(accountSid, authToken);

// 📌 1. Place an Order & Send WhatsApp Notification
router.post("/", async (req, res) => {
  try {
    const { customerName, storeId, products, total, paymentMethod, phoneNumber } = req.body;

    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    const order = await Order.create({ customerName, storeId, total, status: "pending", paymentMethod });

    // Send WhatsApp Order Confirmation
    const message = `New Order from ${customerName} at ${store.name}! Total: ${total} OMR. Payment: ${paymentMethod}.`;
    
    await client.messages.create({
      body: message,
      from: `whatsapp:${whatsappNumber}`,
      to: `whatsapp:${phoneNumber}`
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
