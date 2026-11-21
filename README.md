# regol-website

Static homepage for [regol](https://regol.org) — an independent, pure-Rust GeoDesk GOL 2.0 reader, spatial query engine, and OpenStreetMap PBF compiler.

## Structure

Plain HTML, CSS, and minimal progressive-enhancement JavaScript with no build step or external dependencies:

- `index.html` — homepage markup and inline adaptive SVG diagrams
- `styles.css` — responsive layout and automatic light/dark color scheme (`prefers-color-scheme` plus optional manual toggle)
- `main.js` — theme switcher, mobile navigation drawer, code tabs, and copy buttons
- `assets/` — web-optimized brand wordmarks (light & dark), emblem, favicons, and Open Graph card

## Local preview

Serve the directory with any static HTTP server:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).
