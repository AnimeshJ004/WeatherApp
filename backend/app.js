import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://192.168.1.9:5174', 'http://192.168.1.9:5173'],
  credentials: true
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGOURI;

// Connect MongoDB
mongoose.connect(MONGODB_URI, {
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
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
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
