# Chrome-Only Lab

Four demos of HTML/CSS that, as of this writing, only Chrome/Edge has shipped, or that only recently crossed into a second engine. Built off the same support audit as [`css-lab4`](../css-lab4/README.md), this lab covers what that one left out: single-browser features that are either too CSS-only-unfriendly to fit a strictly-no-JavaScript demo (the two permission elements), or genuinely CSS-only but narrow enough in support to be worth calling out on their own (customizable `<select>`, typed `attr()`).

Open `index.html` to browse all four.

Examples:
1. Customizable Select (CSS only)
2. Typed attr() (CSS only)
3. Geolocation Element (needs JS)
4. Camera/Mic Element (needs JS)

## Notes

**Demos 1 and 2** are CSS-only, same spirit as the `css-lab*` series. Demo 1 (customizable `<select>`/`<selectedcontent>`) degrades to a fully functional native select wherever `appearance: base-select` isn't recognized, Chrome/Edge 135+ and Safari 27+ support it, Firefox has a positive position but hasn't shipped. Demo 2 (typed `attr()`) is Chrome/Edge-only (133+); it's gated behind `@supports (background: attr(data-accent type(<color>)))` with a flat fallback color declared first, and it deliberately mixes in the *other* form of `attr()`, plain string interpolation into `content`, which has always worked everywhere, to show the two side by side.

Demo 2's real pitfall, found by building it, not by reading about it: `attr()` only ever reads from the exact element the declaration is on, never an ancestor. The row (`<li class="server-card">`) carries `data-accent`/`data-load`, but the load bar's own width and color are declared on a nested `<span class="server-load-fill">` two levels down, that span needs its *own* copies of both attributes, or `attr()` finds nothing, is invalid at computed-value time, and the property quietly resets to its initial value (`auto` width, `transparent` background) instead of falling back to any other declared rule. The bars rendered full-width and invisible until both attributes were duplicated directly onto the fill span. Same root cause as the generated percent label two sections up, which lives on `.server-card::after` for exactly this reason, it's the one pseudo-element that actually has access to the row's own attributes.

**Demos 3 and 4** are declarative permission elements (`<geolocation>`, `<usermedia>`): the browser owns the button and the permission prompt, the page just listens for an event and reads a property (`.position`/`.stream`) off the element. There's no way to read either back out in pure CSS, so both demos carry a small `script.js` that feature-detects the element (`typeof HTMLGeolocationElement`/`HTMLUserMediaElement === "function"`) and falls back to the classic `navigator.geolocation`/`navigator.mediaDevices.getUserMedia()` API behind a plain button when it's missing. Both need a secure context (`https://` or `http://localhost`), geolocation and camera/mic access are blocked entirely on `file://` pages and on plain `http://` origins other than localhost.

Worth being upfront about: shipping in a stable Chrome version number doesn't mean these are on by default. Both elements are the kind of feature that's typically gated behind an origin trial or `chrome://flags/#enable-experimental-web-platform-features`, so most visitors, including most Chrome users, will land on the fallback path in both demos regardless of browser. That's not a bug in the demo, it's the actual current state of these two features, and it's exactly why the fallback path is written to be just as functional as the enhanced one.
