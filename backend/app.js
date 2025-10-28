import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/weather", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Example schema
const UserSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", UserSchema);

// API Route
app.get("/weather", async (req, res) => {
  const city = req.query.city || "London"; // Default to London if no city provided
  const apiKey = process.env.MY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "City not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
