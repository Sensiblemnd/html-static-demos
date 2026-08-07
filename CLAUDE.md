# static-site-demos

## Package manager
Uses **pnpm** (`pnpm-lock.yaml`). Never run `pnpm install` or other pnpm commands automatically — the user runs them manually.

## Stack
- Vite + React 19 + TypeScript, `demo1-react` app under `src/`.
- Linting: ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-config-prettier` (disables stylistic rules that conflict with Prettier). Run via `pnpm lint`.
- Formatting: Prettier (`.prettierrc`, `.prettierignore`). Run via `pnpm format` (writes) or `pnpm format:check`.
- `typescript` is pinned to `^6.0.2`, not 7.x — `typescript-eslint` doesn't support TS 7's new API yet (expected in TS 7.1). Don't bump past 6.x until typescript-eslint adds support.
- `src/vite-env.d.ts` provides `vite/client` types (needed for CSS side-effect imports etc.) — keep it if regenerating the src tree.
