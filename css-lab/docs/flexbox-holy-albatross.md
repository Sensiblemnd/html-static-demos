# The Flexbox Holy Albatross

**Source:** [heydonworks.com/article/the-flexbox-holy-albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/)
**Author:** Heydon Pickering (published January 13, 2019)

## The problem

Three items in a flex row, wrapping as the container narrows, will pass through an awkward two-plus-one state before reaching a single column — one item looks orphaned/special when it isn't meant to. Pickering wanted the layout to jump straight from "row of three" to "fully stacked," with nothing in between.

He explicitly rules out media queries: "breakpoints are anathema to design systems" — a component authored once should adapt to whatever container it's dropped into, not the viewport. He also rules out `ResizeObserver` + JavaScript as unnecessarily heavy (and, at the time of writing, thin on browser support) for a problem CSS itself can solve.

## The formula

```css
.container {
  display: flex;
  flex-wrap: wrap;
  --multiplier: calc(40rem - 100%);
}

.container > * {
  min-width: 33%;
  max-width: 100%;
  flex-grow: 1;
  flex-basis: calc(var(--multiplier) * 999);
}
```

## How the math works

`100%` inside `--multiplier` resolves against the flex container's own width once substituted into `flex-basis` — so this is already container-relative with no `@container` rule needed, and no explicit container-type/containment required either.

- **Container ≥ 40rem** (row fits): `40rem - 100%` is negative → `* 999` produces an absurdly negative `flex-basis` → browsers clamp negative flex-basis, so `min-width: 33%` takes over → three even columns.
- **Container < 40rem** (row doesn't fit): `40rem - 100%` is positive → `* 999` produces an absurdly large `flex-basis` → `max-width: 100%` caps it → each item wraps to its own full-width row.

The `* 999` multiplier is what forces the binary snap: any real difference between the container's width and the 40rem threshold gets amplified far past the `[33%, 100%]` range the `min`/`max-width` pair allows, so there's no intermediate wrapped state — only "all in a row" or "all stacked."

## Caveats from the article

- **Gaps eat into the math.** If real spacing is needed between items, `gap`/margins must be subtracted from the `min-width` calculation, or three items can fail to fit on one line even above the threshold (see this lab's [15 – The Holy Albatross](../15-true-holy-albatross/), which hit exactly this bug and fixes it with `min-width: calc((100% - 2rem) / 3)`).
- **Item count isn't automatic.** Different numbers of elements need different `min-width` percentages (`33%` only applies to a group of three); the article shows adapting the technique with `:nth-child` selectors for other counts.
- **Editor's note in the article:** Pickering flags a follow-up piece, "The Flexbox Holy Albatross Reincarnated," describing an even simpler version of this technique — worth reading if this pattern gets reused for a group size other than three.

## Used in this lab

- **[15 – The Holy Albatross](../15-true-holy-albatross/)** — the technique close to verbatim, three items, no `@container`.
- **[16 – Container-Scoped Albatross](../16-container-scoped-albatross/)** — the same binary-switch idea, but the switch itself is driven by `cqi` container query units and also drives radius/gap, not just layout.
- **[17 – Chained Albatross](../17-chained-albatross/)** — two chained copies of the switch produce three states (row → 2-column → stacked) instead of the article's binary flip.
- **[20 – Animatable Constraint Switch](../20-animatable-constraint-switch/)** — demo 16's exact formula, but the switch variable is registered via `@property` so the snap eases instead of jumping instantly.
