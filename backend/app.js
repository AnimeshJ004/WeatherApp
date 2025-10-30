import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// --- Setup __dirname and dotenv ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env file from the root directory (one level up)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const MONGODB_URI = process.env.MONGO_ATLAS_URI;
const frontendURL = "https://weatherapp-frontend-8sy0.onrender.com";

// --- Middleware ---

// 1. CORS Configuration
//    (Added your frontendURL to the origin array)
app.use(cors({
  origin: [
    'http://localhost:5174', 
    'http://localhost:5173', 
    'http://192.168.1.9:5174', 
    'http://192.168.1.9:5173',
    frontendURL // <-- IMPORTANT FIX
  ],
  credentials: true
}));

// 2. Body Parser
app.use(express.json());

// --- MongoDB Connection ---
// Check if MONGODB_URI is loaded
if (!MONGODB_URI) {
  console.error("MongoDB Connection Error: MONGODB_URI is not defined.");
  console.error("Please set MONGODB_URI in your Render Environment Variables.");
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err.message));
}

// --- API Routes ---
// (Example schema, feel free to remove if unused)
const UserSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", UserSchema);

app.get("/weather", async (req, res) => {
  const city = req.query.city || "London"; 
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not found. Server configuration error." });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "City not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Weather fetch error:", error);
    res.status(500).json({ error: "Failed to fetch weather data"});
  }
});

// --- Serve Frontend ---
// This section serves your React/Vite app's static files (CSS, JS, images)
// and handles client-side routing.
//
// CHANGED 'build' back to 'dist'. Please confirm this is your build folder's name
// (e.g., the folder created when you run 'npm run build' in /frontend)
const frontendDistPath = path.join(__dirname, "../dist");
app.use(express.static(frontendDistPath));

// Catch-all route to serve index.html for any request that doesn't match an API route
console.log("Setting up catch-all route..."); // <-- Added this log
// Using Regex /.*/ as a catch-all to bypass the PathError
app.get(/.*/, (req, res) => { 
  const indexPath = path.resolve(frontendDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err.message);
      res.status(404).send("Frontend not found. (index.html is missing from build folder)");
    }
  });
});

// --- Start Server ---
// (This should be the *only* app.listen call and it should be at the end)
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
