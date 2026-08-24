# Conditional Border-Radius in CSS

**Source:** [ishadeed.com/article/conditional-border-radius](https://ishadeed.com/article/conditional-border-radius/)
**Author:** Ahmad Shadeed

## The idea

Shadeed noticed Facebook's homepage rounding a card's corners only when the card has room to breathe, and squaring them off the instant the card becomes edge-to-edge with the viewport (confirmed as intentional by Facebook engineers Miriam Suzanne and Frank Yan). Rather than hardcoding a breakpoint, the radius is derived from comparing the viewport's width against the element's own rendered width — no media query, no container query.

## The formula

```css
.card {
  border-radius: max(
    0px,
    min(8px, calc((100vw - 4px - 100%) * 9999))
  );
}
```

or the equivalent, cleaner `clamp()` form (the article notes Facebook avoided `clamp()` only because of limited Safari 12 support at the time — not a concern for this lab's evergreen target):

```css
.card {
  border-radius: clamp(0px, (100vw - 4px - 100%) * 9999, 8px);
}
```

## How the math works

`100vw` is the true viewport width; `100%` resolves to the element's own rendered width. Their difference is ~0 when the element spans the full viewport (no side margin) and grows large whenever the element sits inside a narrower, padded container.

- **Card is full-bleed** (viewport 375px, card 375px): `(375 - 4 - 375) * 9999 = -39,996px` → clamps down to `0px`.
- **Card has room** (viewport 1440px, card 700px): `(1440 - 4 - 700) * 9999 = 7,359,264px` → clamps up to `8px`.

The `* 9999` multiplier is the trick that turns this into a binary switch: any real difference between viewport and element width gets amplified into a number far outside the `[0px, 8px]` range, so `clamp()`/`min()`/`max()` always snap to one endpoint or the other — never an intermediate value. The `4px` fudge factor absorbs sub-pixel/scrollbar rounding right at the boundary.

## Used in this lab

- **[14 – Zero-Query Radius Snap](../14-zero-query-radius-snap/)** implements this formula close to verbatim.
