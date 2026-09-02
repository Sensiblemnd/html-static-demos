# CSS Variable Slider Lab

Eleven standalone HTML/CSS demos, no JavaScript. Demos 1–8 are built on one trick: give a range slider's thumb a `view-timeline`, bind a registered `@property` to that timeline, and the property updates live as the thumb moves. See [`docs/`](docs/) for a note on the source article.

Open `index.html` in a **Chromium browser** (Chrome, Edge) — the slider technique relies on scroll-driven animations, which aren't yet supported elsewhere. Drag the slider(s) in each demo.

Examples:
1. Typography Scale
2. Color Channel Mixer
3. Duotone Filter Slider
4. Blob Morph
5. Tilt Card
6. Gradient Angle Dial
7. Equalizer Bars
8. Theme Blend
9. Contrast Color Picker
10. Brand Palette
11. Color-Shift Progress Bar

All demos share the dark theme tokens from `_shared.css`. Demos 2, 5, and 7 register more than one custom property to wire up multiple independent sliders at once. Demos 9–11 drop the range-slider/`view-timeline` trick entirely and need a very recent browser (Chrome 147+, Firefox 146+, Safari 26+) rather than just a Chromium one. Demos 9 and 10 use radio-button swatches that set a `--brand` custom property via `:has()`, with `contrast-color(var(--brand))` picking readable text automatically; demo 10 goes further, deriving a whole palette from that one `--brand` pick with `color-mix()` (shades) and relative color syntax (`rgb(from var(--brand) r 0 0)` for channel extraction). Demo 11 swaps the picker for a looping `@keyframes` animation on two registered properties (a `<number>` driving `hsl()` hue math, an `<integer>` feeding a CSS counter for live "N%" text) — `contrast-color()` keeps that text readable through the whole sweep.
