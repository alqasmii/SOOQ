require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // PostgreSQL database connection

const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Check if running in production
const isProduction = process.env.NODE_ENV === "production";

// PostgreSQL Database Connection
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Disable SSL for local DB
});

// Test database connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err.message));

app.get("/", (req, res) => res.send("Sooq App Backend Running"));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const storeRoutes = require("./routes/store");
const productRoutes = require("./routes/product");

app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

