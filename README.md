# Static Site Demos

A small collection of standalone HTML/CSS experiments. No build step, no dependencies, just open the HTML file in a browser or serve it with anything that can host static files.

## demo1 Timeline Grid

A CSS only day-schedule grid (think calendar/Gantt view), built entirely with native CSS Grid and subgrid. No JavaScript involved. A few things worth pointing out if you're poking around the code:

- Colors and spacing are driven by design tokens (custom properties), not hardcoded values.
- The row/column gaps are configurable via `--timeline-row-gap` and `--timeline-column-gap`, and the divider lines re-center themselves automatically whatever you set them to.
- The header and the row backgrounds share one gradient definition, so they can't drift out of alignment with each other.

Open `demo1/inde.html` to see it.
