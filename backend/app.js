import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// --- Setup __dirname and dotenv ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const MONGODB_URI = process.env.MONGO_ATLAS_URI;

// --- CORS ---
// Allow any Render subdomain + localhost for dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://192.168.1.9:5173',
  'http://192.168.1.9:5174',
  // Add your exact frontend Render URL here:
  'https://weatherapp-frontend-8sy0.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps, same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

// --- Body Parser ---
app.use(express.json());

// --- MongoDB ---
if (!MONGODB_URI) {
  console.error("MONGO_ATLAS_URI is not defined — skipping DB connection.");
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err.message));
}

// --- Weather API Route ---
// Always returns JSON — never HTML
app.get("/api/weather", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const city = req.query.city || "London";
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  try {
    const apiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data.message || "City not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Weather fetch error:", error);
    res.status(500).json({ error: "Failed to fetch weather data from OpenWeatherMap." });
  }
});

// --- Serve Frontend (dist) ---
const frontendDistPath = path.join(__dirname, "../dist");
app.use(express.static(frontendDistPath));

// Catch-all: serve index.html for client-side routing
app.get(/(.*)/, (req, res) => {
  const indexPath = path.resolve(frontendDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err.message);
      res.status(500).json({ error: "Frontend build not found. Run npm run build." });
    }
  });
});

// --- Start Server ---
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
