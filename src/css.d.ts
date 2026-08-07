// Allows passing CSS custom properties (`--foo`) through React's `style` prop.
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
