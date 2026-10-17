# dcd. portfolio

Engineering portfolio for **dcd.** — Four developers, connected thinking.  
React 19 + TypeScript + Vite + Tailwind CSS + GSAP + Lenis.

---

## Quick Start

```bash
npm install
npm run dev        # Starts Vite dev server at 127.0.0.1:5173
npm run build      # Strict TypeScript check & production Vite build in dist/
npm run preview    # Local preview of the production bundle
```

---

## Architectural Overview & Directory Structure

To support team collaboration and maintain production velocity, code is strictly decoupled into modular, single-responsibility domains:

```text
src/
├── components/          # Reusable, well-scoped UI components
│   ├── common/          # Low-level primitives & shared UI (Arrow.tsx)
│   ├── layout/          # Page chrome (Header.tsx, Footer.tsx, Cursor.tsx)
│   ├── navigation/      # Shortcut & command dialog (ShortcutDialog.tsx)
│   ├── sections/        # Major sections (Hero, Approach, WorkStage, Services, Team)
│   └── work/            # Conceptual drawings & visual adapters (Blueprint.tsx, ProjectArt.tsx)
├── context/             # App-level context providers (if needed)
├── data/                # Strongly typed datasets (projects.ts, services.ts, navigation.ts)
├── hooks/               # Encapsulated stateful lifecycle hooks:
│   ├── useTheme.ts      # Circular view-transition theme switcher
│   ├── useLenisScroll.ts# Lenis + GSAP ScrollTrigger sync + reduced-motion handling
│   ├── useCursor.ts     # Blueprint interactive coordinate crosshair cursor
│   └── useShortcuts.ts  # Cmd+K shortcut listener and focus restoration
├── styles/              # Modular domain stylesheets
│   ├── tokens.css       # Variables: --bg, --fg, --accent, typography, themes
│   ├── base.css         # Resets, frame lines, common buttons, reduced-motion
│   ├── cursor.css       # Blueprint crosshairs & coordinates
│   ├── header.css       # Sticky nav & progress ruler
│   ├── hero.css         # Hero statement typography & telemetry
│   ├── manifesto.css    # Approach wireframe reveal
│   ├── work.css         # Pinned work stage & blueprints
│   ├── services.css     # Directional hover cards
│   ├── team.css         # Team roster & marks
│   ├── footer.css       # Footer
│   └── dialog.css       # Command palette (⌘K)
├── types/               # TypeScript interfaces & ambient declarations
├── App.tsx              # Clean declarative orchestrator (<80 lines)
├── index.css            # Central import hub (<15 lines)
└── main.tsx             # Application bootstrap
```

---

## Team Standards & The Ponytail Philosophy

This repository adheres to the **Ponytail** engineering philosophy: *The best code is the code you never wrote.*

Before writing new code, developers and AI agents climb the **Laziness Ladder**:
1. **YAGNI**: Does this feature or abstraction actually need to exist?
2. **Reuse**: Check `src/components/`, `src/hooks/`, and `src/data/` first.
3. **Standard Library**: Prefer native modern JS/TS APIs.
4. **Native Platform Features**: Use native `<dialog>`, CSS variables, and native scrolling.
5. **Existing Dependencies**: Never introduce new npm packages without team consensus.
6. **The One-Line Solution**: Condense logic without compromising clarity.
7. **The Minimum Working Solution**: Clean, minimal code preserving full accessibility and type safety.

See [AGENTS.md](file:///c:/Users/QCU/source/repos/dcd/AGENTS.md) and [.agents/rules/ponytail.md](file:///c:/Users/QCU/source/repos/dcd/.agents/rules/ponytail.md) for full details.

---

## Workspace Rules & Skills

- **Rules (`.agents/rules/`)**:
  - `ponytail.md`: The 7-step Laziness Ladder and anti-bloat guidelines.
  - `architecture.md`: Folder structure conventions and component purity.
  - `typescript.md`: Strict TypeScript standards (zero `any`, ambient typing).
- **Skills (`.agents/skills/`)**:
  - `ponytail`: Procedure for PR audits, eliminating over-engineering, and enforcing minimalist code.
  - `component`: Blueprint for creating new production components.
  - `verification`: Step-by-step checklist for production builds and accessibility tests.

---

## Accessibility & Performance Features

- **Keyboard Navigation**: `Ctrl/Cmd + K` opens the command dialog with auto-focus, arrow-key navigation, and `Escape` focus restoration.
- **Theme Switching**: Native View Transition with circular clip-path animation and graceful fallback.
- **Reduced Motion**: Honored via `prefers-reduced-motion: reduce`. GSAP scrubs and Lenis smooth scrolling are bypassed for accessibility while preserving full layout legibility.
