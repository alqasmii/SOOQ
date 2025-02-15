require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";

// PostgreSQL connection using pg (for testing; Sequelize handles its own connection)
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err.message));

app.get("/", (req, res) => res.send("Sooq App Backend Running"));

const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");
// (Include other routes as needed)
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
// app.use("/api/products", require("./routes/product"));
// app.use("/api/orders", require("./routes/order"));
// app.use("/api/payments", require("./routes/payment"));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
