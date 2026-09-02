# Anchor-Positioned Nav Highlight

Reproduces the moving "cutout" highlight from Kevin Powell's nav bar (see [kevinpowell.co/newsletter](https://www.kevinpowell.co/newsletter/) for the live version), built from a walkthrough of how he made it. Not a copy of his source — just the same technique, re-derived.

## The core trick

A single custom ident, `--hovered-link`, is declared as an `anchor-name` on whichever `<li>` is currently `:hover`/`:focus-within`. Because the *name* never changes, only *which element carries it*, the highlight's `position-anchor: --hovered-link` reference stays valid the whole time — so its `top`/`left`/`right`/`bottom` (each an `anchor()` function) can transition smoothly between links. Swapping `position-anchor` itself is a discrete property and can't be animated; swapping which element owns a stable anchor name can.

## Two pitfalls from the original video

- An element that both declares `anchor-name` and has `position: relative` breaks the anchor lookup (something to do with it establishing a new containing block). The `<li>` carrying `anchor-name` in this demo is left `position: static`.
- The two anchor-driven pseudo-elements (`::before` for the tint/blur, `::after` for the duplicated background) use negative `z-index` to sit behind the nav's own text. Without `isolation: isolate` on the `<nav>`, those negative z-index layers escape the nav's own stacking context and can end up rendered behind unrelated page content instead of just behind the nav's label text.

## The "cutout" background

`<body>` and the nav's pseudo-elements share the exact same `background-image` with `background-attachment: fixed`. Because a fixed-attachment background is pinned to the viewport rather than the element, the nav's copy lines up pixel-for-pixel with the page's copy — so the pseudo-element reads as a window into the page background rather than a separately-drawn image. A darkening gradient plus `backdrop-filter: blur()` on top keeps the text underneath legible.

## Browser support

Anchor positioning (Stable in Baseline as of late 2025, but young) and `corner-shape` (Chrome 139+ only, no other engine yet) are both guarded with `@supports`. Without support: the nav falls back to a plain underline on `:hover`/`:focus-visible`, and shapes fall back to a plain `border-radius`.
