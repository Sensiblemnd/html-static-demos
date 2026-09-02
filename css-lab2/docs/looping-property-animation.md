# Looping Registered Properties: Counters and Live Color Math

Prior art for the color half: [jhey's Jan 2024 post](https://x.com/jh3yy/status/1742951071473967117) combined a range slider's `view-timeline` with `hsl()` to color a track live — same idea demo 11 uses, minus the slider.

## Why this demo dropped the slider

Demo 11 started as a slider-driven version, matching demos 1–8. In testing, the `view-timeline`-on-thumb trick turned out not to reach the true ends of its range — dragging to the slider's max only got `--_p` to about `0.91`, not `1`, and the min floored around `0.09`, not `0`. That's a property of how Chromium exposes the thumb's internal scrollport (an inset it applies by default), not a mistake in the CSS — the same imprecision is presumably present in demos 1–8 too, just less visible there since none of them rely on hitting an exact `0` or `1` endpoint. A progress bar does — "reaches 100%" is the whole point — so demo 11 replaced the slider with a plain, precise `@keyframes` loop instead.

## The trick

Two registered properties, animated together, looping forever:

```css
@property --_p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --_n {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0;
}

.progress-demo {
  animation: sweep-p 3s ease-in-out infinite alternate,
             sweep-n 3s ease-in-out infinite alternate;
}
@keyframes sweep-p { from { --_p: 0; } to { --_p: 1; } }
@keyframes sweep-n { from { --_n: 0; } to { --_n: 100; } }
```

`--_p` (a `<number>`, 0–1) drives both the fill's width and its hue: `hsl(calc(var(--_p) * 120) 70% 50%)` sweeps red (0°) to green (120°). `--_n` (an `<integer>`, 0–100) feeds a CSS counter — `@property` is what makes an *integer* type legal for `counter-reset`, which is what makes `content: counter(pct) "%"` show a live, animating number with no JavaScript. `contrast-color()` then reads the same computed hue to keep the label's text black or white, correctly, at every point in the sweep.

## Browser support

Same bar as demos 9 and 10: needs `contrast-color()`, so a very recent browser (Chrome 147+, Firefox 146+, Safari 26+), not just a Chromium one.
