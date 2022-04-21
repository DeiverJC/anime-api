require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Setup server
const app = express();
const port = process.env.PORT || 3000;

// Setup mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

// Model
const animeSchema = Schema({
  title: { type: String, required: true },
  synopsis: { type: String },
  episodeCount: { type: Number, required: true },
  startDate: { type: Date },
});

const Anime = mongoose.model("Anime", animeSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ name: "Anime API", version: "0.0.1" });
});

// Start server
app.listen(port, () => console.log(`Server on port ${port}`));
