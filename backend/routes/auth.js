const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Ensure this works!

const router = express.Router();

console.log("✅ Checking User model in auth.js:", User); // Debugging

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received registration request for:", { name, email });

    if (!User) {
      console.error("❌ ERROR: User model is undefined in auth.js!");
      return res.status(500).json({ error: "Database model error" });
    }

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
