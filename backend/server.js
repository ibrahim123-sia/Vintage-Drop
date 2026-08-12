const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");
const checkoutRoute = require("./routes/checkoutRoutes");
const orderRoute = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/orderAdminRoutes");
const payfastRoutes = require("./routes/payfastRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // PayFast posts its callback as x-www-form-urlencoded
app.use(cors());

const PORT = process.env.PORT || 9200;

app.get("/", (req, res) => res.send("The Vintage Drop API is Live"));

// Ensure the DB is connected before any /api request is handled. On a
// serverless platform, letting a failed connection crash the process
// (e.g. process.exit) takes down every subsequent request on that
// instance with an opaque platform-level error instead of a normal
// JSON response.
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({ message: "Service temporarily unavailable, please try again shortly." });
  }
});

//user routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/payfast", payfastRoutes);

//Admin route
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);

// Only bind a listening port for local/traditional hosting. On Vercel the
// exported app is invoked per-request instead, and app.listen() here would
// otherwise sit alongside a connectDB() call that can crash the whole
// serverless process on a transient DB hiccup.
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to database:", error.message);
      process.exit(1);
    });
}

module.exports = app;
