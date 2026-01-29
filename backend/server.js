const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from config.env file
// In production, environment variables should be set directly, not from file
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, "config.env") });
}

const DB = process.env.MONGO_URI;

if (!DB) {
  console.error("❌ MONGO_URI environment variable is not set!");
  process.exit(1);
}

mongoose
  .connect(DB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});