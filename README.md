# schmoundcloud
Soundcloud sucks, let's self-host tracks now

## structure

```
schmoundcloud/
├── server.js
├── build_library.js
├── library.json
├── waveforms/
├── public/
│   ├── index.html
│   └── track.html
└── music/
```

where:
- `server.js`
- `build_library.js` automatically builds the library metadata (`library.json`) and waveforms (in `waveforms/`) from `music/`
- `public/` holds the frontend, `index.html` for the tracklist and `track.html` for the track page
- `music/` has all the mp3 files