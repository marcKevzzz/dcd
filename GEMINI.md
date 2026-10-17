# Workspace Rules: dcd. Portfolio

This project enforces the standards documented in [AGENTS.md](file:///c:/Users/QCU/source/repos/dcd/AGENTS.md) and [.agents/rules/ponytail.md](file:///c:/Users/QCU/source/repos/dcd/.agents/rules/ponytail.md).

## Quick Directives:
- **Philosophy**: Apply Ponytail (YAGNI, Laziness Ladder, minimum code, zero extraneous dependencies).
- **TypeScript**: Strict types; never use `any`.
- **Modularity**: Place files according to the established directory architecture in `src/` (`components/`, `hooks/`, `data/`, `types/`).
- **Scalability**: Never hardcode element counts, indices, or fixed lengths; ensure components and timelines dynamically scale from data arrays.
- **A11y**: Always maintain accessibility, focus restoration in dialogs, and reduced-motion bypass.
- **Verification**: Always verify changes by running `npm run build` (`tsc -b && vite build`).
