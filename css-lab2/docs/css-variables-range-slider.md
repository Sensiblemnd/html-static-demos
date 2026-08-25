# Update CSS Variables Using a Range Slider

Source: [css-tip.com/css-variables-range-slider](https://css-tip.com/css-variables-range-slider/)

## The trick

A range input's thumb can be given a `view-timeline`, the same mechanism used for scroll-driven animations. A registered custom property (via `@property`, which makes it animatable) is bound to that timeline through `animation-timeline`. Moving the slider thumb scrubs the bound animation, which updates the property from `0` to `1` in real time — no `input` event listener, no `style.setProperty()`, no JavaScript at all.

```css
@property --_f {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

:root {
  timeline-scope: --_f;
  animation: --_f linear both;
  animation-timeline: --_f;
  animation-range: entry 100% exit 0%;
}

@keyframes --_f { 0% { --_f: 1 } }

input[type="range"]::-webkit-slider-thumb {
  view-timeline: --_f inline;
}
```

Once `--_f` is live, any `calc()` expression built on it becomes slider-controlled — font size, color channels, filter intensity, rotation angles, border-radius corners, anything that accepts a computed value.

## Browser support

Chromium only, for now — this depends on scroll-driven animations (`view-timeline`, `animation-timeline`, `animation-range`), which Chrome and Edge support but Firefox and Safari do not yet. Every demo in this lab requires a Chromium browser.

## What this lab adds

The source article demonstrates one case (font size). This lab applies the same mechanic to eight different kinds of CSS values — color, filters, shape, 3D transforms, gradient angles, layout height, and `color-mix()` theme blending — including cases that wire up several independent sliders on one page at once (each needs its own registered property, timeline name, and `@keyframes`, since `@property` can't be generated in a loop).
