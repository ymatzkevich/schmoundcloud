const fs = require("fs");
const path = require("path");
const mm = require("music-metadata");

const MUSIC_DIR = "./music";
const OUTPUT = "./library.json";

async function buildLibrary() {
  const files = fs.readdirSync(MUSIC_DIR)
    .filter(f => f.endsWith(".mp3"));

  const tracks = [];

  for (const file of files) {

    const filepath = path.join(MUSIC_DIR, file);
    const metadata = await mm.parseFile(filepath);

    tracks.push({
      id: file.replace(".mp3", ""), // URL slug
      file: `music/${file}`,
      title: metadata.common.title || file,
      artist: metadata.common.artist || "Unknown Artist",
      duration: Math.round(metadata.format.duration)
    });
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(tracks, null, 2));
  console.log("Library built");
}

buildLibrary().then(()=> {
  app.listen(3000);
});

const { execSync } = require("child_process");

execSync(
  `audiowaveform -i ${filepath} -o waveforms/${file}.json -b 8`
);