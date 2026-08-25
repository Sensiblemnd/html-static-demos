# The Radio Hack, `:has()`, and Deriving Colors in Pure CSS

Sources: [css-tip.com/rgb-channels](https://css-tip.com/rgb-channels/), [css-tip.com/color-shades-color-mix](https://css-tip.com/color-shades-color-mix/)

Demos 9 and 10 don't use the range-slider `view-timeline` trick from the rest of this lab (see [css-variables-range-slider.md](css-variables-range-slider.md)) — there's no continuous value to scrub, just a discrete "pick one of N" choice, and no equivalent scroll-timeline hook exists for a discrete pick. They use a different no-JS mechanism instead.

## The trick

A hidden `<input type="radio">` per option, each with a `<label>` that does the clicking — the classic "checkbox hack," using radios instead of checkboxes because only one option should be active at a time. `:has()` lifts the `:checked` state from wherever the radio lives in the tree up onto a shared ancestor, where it sets custom properties:

```css
.stage:has(#brand-2:checked) { --brand: var(--color-swatch-2); --brand-hex: "#0f172a"; }
```

This is a variant of the older sibling-combinator (`~`) checkbox hack: instead of requiring the toggled content to be a strict sibling of the checkbox, `:has()` lets any common ancestor pick up state from any descendant. `:checked` is one of the few pseudo-classes CSS keeps live-synced to user interaction — most form input state (typed text, a dragged slider's *value*, a picked color) is not reflected back into an attribute CSS can read, which is why this only works for discrete, enumerable choices.

## Deriving a palette from one value (demo 10)

Once `--brand` is live, two further CSS-only features build a whole palette from it, each demonstrated separately on css-tip.com but not combined with a live picker or with `contrast-color()` before this lab:

**`color-mix()`** blends the base color toward white or black for a lighter/darker shade:

```css
--brand-light: color-mix(in srgb, var(--brand), #fff 30%);
--brand-dark: color-mix(in srgb, var(--brand), #000 30%);
```

**Relative color syntax** isolates a single channel by zeroing out the others:

```css
--brand-r: rgb(from var(--brand) r 0 0);
--brand-g: rgb(from var(--brand) 0 g 0);
--brand-b: rgb(from var(--brand) 0 0 b);
```

Every derived swatch then runs its own `color: contrast-color(var(--x))` — the payoff being that contrast is recomputed independently for all six colors, not just the one a user actually picked.

## Browser support

Needs `contrast-color()` and relative color syntax: a very recent browser (Chrome 147+, Firefox 146+, Safari 26+), not just a Chromium one — the inverse constraint from demos 1–8, which need Chromium specifically but not a bleeding-edge version.
