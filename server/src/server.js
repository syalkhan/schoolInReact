import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// Test route: database se current time mangwata hai
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result)
    res.json({ status: "ok", dbTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});