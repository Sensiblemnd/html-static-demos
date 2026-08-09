# Static Site Demos

A small collection of standalone HTML/CSS experiments. No build step, no dependencies, just open the HTML file in a browser or serve it with anything that can host static files.

## demo1 Timeline Grid

A CSS only day-schedule grid (think calendar/Gantt view), built entirely with native CSS Grid and subgrid. No JavaScript involved. A few things worth pointing out if you're poking around the code:

- Colors and spacing are driven by design tokens (custom properties), not hardcoded values.
- The row/column gaps are configurable via `--timeline-row-gap` and `--timeline-column-gap`, and the divider lines re-center themselves automatically whatever you set them to.
- The header and the row backgrounds share one gradient definition, so they can't drift out of alignment with each other.

Open `demo1/inde.html` to see it.

## Tailwind v1.9.6 Timeline Grid POC

The same timeline component, rebuilt from scratch with Tailwind CSS **v1.9.6** utility classes instead of the native CSS used by `demo1-react`. It lives in `src-tailwind/` (its own React tree, own `tailwind.config.js` at the repo root) so it shares no CSS or components with `src/` — same `package.json`/install as the rest of the repo, served as a second page (`tailwind.html`) by the same Vite dev server.

Tailwind v1.9.6 predates arbitrary values and `subgrid` utilities, so the layout is a deliberate simplification: each row is one plain CSS grid with dividers and event blocks explicitly placed on the same track, rather than the three stacked subgridded layers the native-CSS version uses. See `src-tailwind/components/TimelineGrid.tsx` for details.

Tailwind is compiled via its own v1 CLI (`tailwindcss build`) into a plain generated stylesheet (`src-tailwind/tailwind.generated.css`, gitignored) rather than wired into Vite's PostCSS pipeline, to avoid conflicts between Tailwind's PostCSS 7 requirement and Vite's own PostCSS 8 internals. `pnpm dev` runs the Tailwind CLI in watch mode alongside `vite` via `concurrently`.

Visit `/tailwind.html` in the dev server (or run `pnpm build` for a production build of both pages).
