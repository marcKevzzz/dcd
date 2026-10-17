# TypeScript Engineering Standards

## Principles
1. **Zero `any`**: Do not use `any`. Use strict interfaces, union types, or `unknown` with type guards.
2. **Ambient Types**: For browser features that are not yet standard across all TS lib versions (e.g., `document.startViewTransition`), declare them in `src/types/*.d.ts` rather than type-casting with `(document as any)`.
3. **Strict Props**: Always define an interface for component props with descriptive names (e.g. `HeaderProps`, `WorkStageProps`).
4. **Type Exports**: Keep shared domain types in `src/types/` (e.g., `Project`, `Service`, `NavAction`) and export them cleanly.
5. **Type Imports**: Use `import type { ... }` when importing types to optimize tree-shaking and bundler output.
