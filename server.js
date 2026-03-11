const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const LIBRARY_FILE = path.join(__dirname, "library.json");

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// serve music files
app.use("/music", express.static(path.join(__dirname, "music")));

// serve waveform peaks
app.use("/waveforms", express.static(path.join(__dirname, "waveforms")));

// API: return library
app.get("/api/library", (req, res) => {
  try {
    const library = JSON.parse(fs.readFileSync(LIBRARY_FILE));
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: "library not found" });
  }
});

// Clean track URLs
app.get("/:trackId", (req, res, next) => {

  const trackId = req.params.trackId;

  let library;

  try {
    library = JSON.parse(fs.readFileSync(LIBRARY_FILE));
  } catch (err) {
    return res.status(500).send("library missing");
  }

  const track = library.find(t => t.id === trackId);

  if (!track) {
    return next(); // allow normal 404
  }

  res.sendFile(path.join(__dirname, "public", "track.html"));
});

// fallback to index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Music server running on port ${PORT}`);
});