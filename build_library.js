const fs = require("fs");
const path = require("path");
const mm = require("music-metadata");

const MUSIC_DIR = path.join(__dirname, "music");
const WAVEFORMS_DIR = path.join(__dirname, "waveforms");

const OUTPUT = path.join(__dirname, "library.json");

if (!fs.existsSync(WAVEFORMS_DIR)) {
  fs.mkdirSync(WAVEFORMS_DIR);
}

async function buildLibrary() {
  const files = fs.readdirSync(MUSIC_DIR)
    .filter(f => f.endsWith(".mp3"));

  const tracks = [];

  for (const file of files) {

    const filepath = path.join(MUSIC_DIR, file);
    const metadata = await mm.parseFile(filepath);
    const picture = metadata.common.picture[0]
    
    tracks.push({
      id: file.replace(".mp3", ""), // URL slug
      file: `music/${file}`,
      title: metadata.common.title || file,
      artist: metadata.common.artist || "Unknown Artist",
      image_source: `data:${picture.format};base64,${Buffer.from(picture.data, "utf-8").toString("base64")}`, // encoded cover art
      duration: Math.round(metadata.format.duration)
    });

    const { execSync } = require("child_process");

    execSync(
      `audiowaveform -i ${filepath} -o waveforms/${file}.json -b 8`
    );
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(tracks, null, 2));
  console.log("Library built");
}

module.exports = buildLibrary;