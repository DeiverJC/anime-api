require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setup server
const app = express();
const port = process.env.PORT || 3000;

// Setup middlewares
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

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

/* Find All Animes */
app.get("/animes", (req, res) => {
  Anime.find((err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

/* Find by ID animes */
app.get("/animes/:id", (req, res) => {
  Anime.findById(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

/* Create New Anime */
app.post("/animes", (req, res) => {
  const anime = new Anime(req.body);
  anime.save((err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

/* Update Anime */
app.patch("/animes/:id", (req, res) => {
  Anime.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) return console.error(errr);
    res.json(data);
  });
});

/* Delete Anime */
app.delete("/animes/:id", (req, res) => {
  Anime.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

// Start server
app.listen(port, () => console.log(`Server on port ${port}`));
