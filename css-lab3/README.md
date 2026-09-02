# CSS Anchor Positioning Lab

Standalone HTML/CSS demos, no JavaScript. See [`docs/`](docs/) for technique notes.

Open `index.html` in a **recent Chromium browser** (Chrome 139+) — these demos lean on CSS anchor positioning and `corner-shape`, both very new. Non-Chromium browsers, and older Chrome, get the documented `@supports` fallback for each demo instead of a broken page.

Examples:
1. Anchor-Positioned Nav Highlight

Demo 1 anchors a single moving highlight to whichever nav link is hovered or focused, using one shared `anchor-name` that gets reassigned to the active `<li>` rather than swapping which element the highlight points at — the latter is a discrete change and can't transition, the former can. The highlight itself is a "cutout": it shares the page's `background-attachment: fixed` image with the body, so it reads as a blurred, darkened window into the page rather than a separately-drawn shape.
