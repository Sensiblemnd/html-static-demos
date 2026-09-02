# Timeline Grid Lab

Nine standalone HTML/CSS demos spun off the [Timeline Grid](../timeline-grid/) demo's core trick: a header row and per-row backgrounds all locked to one shared column grid via `grid-template-columns: subgrid`. No JavaScript anywhere. Interactivity comes from the checkbox/radio hack, `:has()`, container queries, and native `resize`.

Open `index.html` to browse all nine, or open any numbered folder directly.

1. **Overlapping Events**: concurrent events get explicit `--lane` rows inside `.row-data`, so a row's height grows to fit however many events overlap at once.
2. **Now Indicator**: a registered `@property --now-position` (a `<percentage>`) drives a vertical line's `inset-inline-start`; a looping `@keyframes` animation simulates a live clock since there's no JavaScript to read the real one. Respects `prefers-reduced-motion`.
3. **Density Toggle**: three pre-built grids (15/30/60 minute columns) swap visibility via hidden radios and `:has()` on a wrapping element.
4. **Dark Mode Toggle**: color tokens declared once as `light-dark(light, dark)`, with one panel following the system `prefers-color-scheme` automatically and another forcing `color-scheme` via radios + `:has()`. A bonus swatch uses `light-dark()` on a `background-image` itself, gated behind `@supports` since image support there is still landing across browsers.
5. **Responsive Agenda**: a container query collapses the grid into a stacked agenda list once its container narrows. The container sits inside a `resize: horizontal` wrapper, so dragging the native resize handle demonstrates it live.
6. **Gantt Chart**: the same subgrid header/row pattern, with days on the axis instead of hours, a labeled row per task, and a diamond milestone marker for a single-day event.
7. **Contribution Heatmap**: a GitHub-style activity grid. `data-level` picks a color token per square, same idea as the base demo's `data-color`. Laid out with `grid-auto-flow: column` and a fixed 7-row template rather than subgrid, since there's no header to align to.
8. **Resource Scheduler**: a rooms × hours matrix. The grid gains one fixed-width label column ahead of the hour columns; every subgrid still inherits it, and the label cells add `position: sticky` to stay put while the hours scroll horizontally.
9. **Kanban Board**: the subgrid trick turned sideways: rows (not columns) are shared across siblings, so cards in the same position line up at the same height across every list. No drag-and-drop, since that needs JavaScript.
