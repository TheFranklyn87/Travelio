const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

app.post("/api/itinerary", async (req, res) => {
    console.log("Received request:", req.body);
    const { city, startDate, endDate } = req.body;
  
    if (!city || !startDate || !endDate) {
        return res.status(400).json({ error: "city, startDate, and endDate are required" });
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start) || isNaN(end) || end < start) {
        return res.status(400).json({ error: "Invalid date range" });
    }
  
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
    const prompt = `Create a day-by-day travel itinerary for ${days} day${days > 1 ? "s" : ""} in ${city} from ${startDate} to ${endDate}. Include attractions, activities, and restaurants. Format clearly.`;
  
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
            contents: [{ parts: [{ text: prompt }] }]
            },
            { headers: { "Content-Type": "application/json" } }
        );
    
        const itinerary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No itinerary generated";
        res.json({ city, startDate, endDate, itinerary });
  
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to generate itinerary" });
    }
});
  
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});