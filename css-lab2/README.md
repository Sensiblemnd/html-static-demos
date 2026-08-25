# CSS Variable Slider Lab

Eight standalone HTML/CSS demos built on one trick: give a range slider's thumb a `view-timeline`, bind a registered `@property` to that timeline, and the property updates live as the thumb moves — no JavaScript. See [`docs/`](docs/) for a note on the source article.

Open `index.html` in a **Chromium browser** (Chrome, Edge) — the technique relies on scroll-driven animations, which aren't yet supported elsewhere. Drag the slider(s) in each demo.

Examples:
1. Typography Scale
2. Color Channel Mixer
3. Duotone Filter Slider
4. Blob Morph
5. Tilt Card
6. Gradient Angle Dial
7. Equalizer Bars
8. Theme Blend

All demos share the dark theme tokens from `_shared.css`. Demos 2, 5, and 7 register more than one custom property to wire up multiple independent sliders at once.
