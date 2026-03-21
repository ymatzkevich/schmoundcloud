# schmoundcloud
Soundcloud sucks, let's self-host tracks now

![:)](./public/icon.png ":)")

## structure

```
schmoundcloud/
├── server.js
├── build_library.js
├── library.json
├── package.json
├── package-lock.json
├── waveforms/
├── public/
│   ├── icon.png
│   ├── index.html
│   └── track.html
└── music/
```

where:
- `server.js` is the Node.js server serving the frontend and the music library via API (it will build the library on startup)
- `library.json` will have all the metadata of the tracks in the library (song name, art cover, ...)
- `build_library.js` defines a function that automatically builds the library metadata (`library.json`) and waveforms (in `waveforms/`) from `music/`
- `public/` holds the frontend, `index.html` for the tracklist and `track.html` for the track page
- `music/` has all the mp3 files
- `waveforms/` will hold all the audio waveforms (1 for each track)
- `package.json` defines the project's metadata, dependencies, scripts, and other configuration
- `package-lock.json` locks down the exact versions of all dependencies, including nested dependencies

## future improvements

- no need to recreate waveforms/metadata for files that are already here (just for the diff i.e. also erase those for files that are not here anymore)
- have different sections ? e.g. tracks, sets, ...