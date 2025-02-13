const express = require("express");
const axios = require("axios");

const router = express.Router();

// 📌 1. Process Payment via Paymob
router.post("/paymob", async (req, res) => {
  try {
    const { amount, customerEmail } = req.body;

    const response = await axios.post("https://api.paymob.com/payment", {
      amount,
      email: customerEmail,
      currency: "OMR"
    });

    res.json({ payment_url: response.data.url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment error");
  }
});

// 📌 2. Process Payment via Thawani Pay
router.post("/thawani", async (req, res) => {
  try {
    const { amount, phoneNumber } = req.body;

    const response = await axios.post("https://api.thawani.om/payment", {
      amount,
      phoneNumber,
      currency: "OMR"
    });

    res.json({ payment_url: response.data.payment_url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment error");
  }
});

// 📌 3. Process Payment via Tap Payments
router.post("/tap", async (req, res) => {
  try {
    const { amount, email } = req.body;

    const response = await axios.post("https://api.tap.company/v2/charges", {
      amount,
      email,
      currency: "OMR"
    });

    res.json({ payment_url: response.data.transaction.url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment error");
  }
});

module.exports = router;
