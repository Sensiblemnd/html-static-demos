# CSS 2026 Features Lab

Four standalone HTML/CSS demos, no JavaScript. Built off a support audit of CSS/HTML features that landed since January 2026, this lab only covers the ones that are actually demoable in CSS alone and either already safe cross-browser or close enough to be worth an `@supports`-gated demo. Advanced typed `attr()`, `<usermedia>`, and standalone `alpha()` were excluded: too single-browser or too unsupported right now to be more than a curiosity.

Open `index.html` to browse all four. Support windows differ per demo, see each card's description and the notes below; nothing here breaks in an unsupported browser, each demo has a plain fallback layout.

Examples:
1. Trimmed Type
2. Signal Meter
3. Staggered Reveal
4. Radial Spokes

## Notes

**Demo 1** (`text-box-trim`/`text-box-edge`) has the widest support of the four: Chrome/Edge 133+, Safari 18.2+, Firefox 154+. It's declared unconditionally, no `@supports` needed, since the property is simply ignored where unsupported and the layout already looks fine without it. The demo paints a solid background color directly behind the sample text rather than relying on a subtle visual comparison: background-color always fills an element's real box, trimmed or not, so it's a truthful way to make the box's edges visible instead of eyeballing where the glyphs sit. An exaggerated `line-height: 2.2` inflates the half-leading `text-box-trim` removes, so the effect is dramatic instead of a couple of pixels.

**Demo 2** (`progress()`) is gated behind `@supports (width: calc(progress(1, 0, 1) * 100%))`, falling back to a fixed 50% fill. Supported in Chrome/Edge 138+ and Safari 26+; Firefox 155 is landing it around the same time this lab was written. Worth flagging: `progress()` returns a bare number, not a length, so testing it as a raw `width` value (`@supports (width: progress(1, 0, 1))`) is invalid regardless of actual support and always evaluates false, that was a real bug here that made the demo look broken (the bar never changed between presets) in a browser that actually supported the function fine. Wrapping it in `calc(... * 100%)` produces a real length-percentage and tests the function correctly.

**Demos 3 and 4** (`sibling-index()`/`sibling-count()`) are the newest and narrowest: Chrome/Edge 138+ and Safari 26.2+, no stable Firefox release yet as of this writing despite a positive spec position. Demo 3 relies on `animation-delay`'s own initial value (`0s`) as its fallback, an unsupported browser just animates every row in at once instead of staggered. Demo 4 is explicitly gated behind `@supports (counter-reset: c sibling-index())` (an integer-typed property doubling as a support test for an integer-returning function) with a plain wrapped-row fallback, since the radial transform math produces overlapping circles if it silently no-ops instead.

Demo 4 also has a non-obvious pitfall worth flagging: `sibling-index()`/`sibling-count()` re-resolve in whichever element's context actually reads them, they don't freeze at the element where a custom property assigns them. The label span nested inside each spoke has no siblings of its own, so a plain `--angle: calc(...)` custom property, read back on that span to counter-rotate the label upright, silently re-evaluated to `sibling-index() = 1, sibling-count() = 1` for every item instead of inheriting the parent's real value. Registering `--angle` with `@property` as a typed `<angle>` forces it to resolve on the spoke, using the spoke's real sibling context, before the resolved degree value inherits down. Worth knowing if you reach for these functions anywhere the computed value needs to travel through more than one element.
