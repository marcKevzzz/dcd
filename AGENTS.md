# dcd. Portfolio — Agent & Developer Guide

Welcome to the **dcd.** engineering repository. This document guides AI agents (Antigravity, Claude Code, Cursor, Copilot) and human contributors to write consistent, production-grade, and minimalist code.

---

## 1. Product & Brand Identity

- **Name**: `dcd.` (Decide & design, Code, Deploy).
- **Core Mission**: Portfolio for four developers showcasing real-world systems (Samson Dental Center, Hole In Hub Golf & Lounge, Helmet Cartel Merchandise).
- **Reference**: [piergorelli.com](https://piergorelli.com/) is the visual, motion, and interaction benchmark. All layout conventions, technical blueprint typography, motion curves, and interactive feedback mirror this reference, adapted to dcd.'s authentic team and project content.
- **Aesthetic**: Technical blueprint portfolio with oversized variable typography (`Archivo Variable`), monospace annotations (`IBM Plex Mono`), fine coordinate crosshairs (`x 0000 · y 0000`), and restrained motion.
- **Constraints**: Do NOT fabricate telemetry, fictitious client metrics, or fake team biographies. Honor the approved visual fidelity and brand commitments.

---

## 2. Reference Alignment: piergorelli.com Design Tokens & Mechanics

When designing or extending sections, match the following core mechanics from [piergorelli.com](https://piergorelli.com/):

- **Sticky Progress Header**: Three-column sticky grid (`1fr auto 1fr`), live percentage ruler track (`.nav-ruler`), and theme toggle.
- **Hero Statement**: Fluid display typography (`clamp(90px, 11.4vw, 174px)`), bottom-aligned statement with typing caret, and monospace telemetry badges (`NO BLACK BOXES`).
- **Manifesto Reveal (`#approach`)**: Wireframe-to-production text fill (`.wf-solid` clip-path scrubbed via ScrollTrigger) with technical margin notes (`↤ 12 col ↦`, `font-size: 7.1vw`, `ls -0.035em`).
- **Selected Work Pinned Stage (`#work`)**: Desktop 3-stage sequence (`01 Design` → `02 Code` → `03 Deploy`), rail indicators (`.ws__rail`), and conceptual SVG blueprints.
- **Services Directional Hover (`#services`)**: Dynamic `--origin` (top/bottom) split reveal on hover with custom cursor tags (`data-cursor`).
- **Interactive Cursor**: Full-viewport crosshair rules (`.cursor__h`, `.cursor__v`), coordinate readout, and elastic magnetic attraction to buttons.
- **Command Palette (`Ctrl/Cmd + K`)**: Accessible native `<dialog>` with focus containment, live query filtering, arrow navigation, and ESC focus restoration.

---

## 3. The Core Philosophy: Ponytail

**"He says nothing. He writes one line. It works."**
We follow Dietrich Gebert's **Ponytail** engineering philosophy: _The best code is the code you never wrote._

Before writing or suggesting any code, climb the **Laziness Ladder**:

1. **YAGNI**: Does this feature or abstraction actually need to exist? Skip speculative flexibility.
2. **Reuse Existing Code**: Check `src/data/`, `src/hooks/`, `src/components/`, and `src/index.css`.
3. **Standard Library**: Prefer native JS/TS methods over helper packages.
4. **Native Platform Features**: Use native `<dialog>`, CSS custom properties, HTML5 semantic elements, and native scroll.
5. **Existing Dependencies**: We use React 19, Vite, GSAP, Lenis, and Tailwind CSS. **Do not install new npm dependencies.**
6. **The One-Line Solution**: Condense logic to its cleanest, most direct expression.
7. **The Minimum Working Solution**: The least code that meets specifications while preserving accessibility, type safety, and error resilience.

---

## 4. Directory Layout

- `src/types/`: TypeScript definitions (`project.ts`, `service.ts`, `navigation.ts`, `view-transitions.d.ts`).
- `src/data/`: Static project and service content.
- `src/hooks/`: Encapsulated lifecycle hooks (`useTheme`, `useCursor`, `useLenisScroll`, `useShortcuts`).
- `src/components/`:
  - `common/`: Low-level primitives (`Arrow.tsx`).
  - `layout/`: Persistent layout components (`Header.tsx`, `Footer.tsx`, `Cursor.tsx`).
  - `navigation/`: Shortcut & command palette (`ShortcutDialog.tsx`).
  - `sections/`: High-level page sections (`Hero.tsx`, `Approach.tsx`, `WorkStage.tsx`, `Services.tsx`, `Team.tsx`).
  - `work/`: Project drawings & imagery (`Blueprint.tsx`, `ProjectArt.tsx`).
- `src/styles/`: Domain stylesheets (`tokens.css`, `base.css`, `cursor.css`, `header.css`, `hero.css`, `manifesto.css`, `work.css`, `services.css`, `team.css`, `footer.css`, `dialog.css`).
- `src/App.tsx`: Lean root orchestrator.
- `src/index.css`: Central import hub (<15 lines).

---

## 5. Key Developer Commands

- `npm run dev`: Launch local Vite dev server (`127.0.0.1:5173`).
- `npm run build`: Production typecheck & Vite build (`tsc -b && vite build`).
- `npm run typecheck`: Strict TypeScript check (`tsc -b`).
- `npm run preview`: Preview production build locally.

---

## 6. Non-Negotiable Standards

- **Zero `any` in TypeScript**: Explicitly declare interfaces.
- **Accessibility (A11y)**: Retain focus traps in `<dialog>`, restore focus upon close, provide `aria-*` attributes and text fallbacks for SVGs, and respect `prefers-reduced-motion`.
- **Responsive Integrity**: Ensure layout works on mobile (360px+), tablet (768px+), desktop (1024px+), and ultrawide without horizontal overflow.
- **Scalability & Data-Driven Logic**: Never hardcode element counts, indices, or fixed lengths (e.g., `[data-index="0|1|2"]`, `panels[0]`, `/03`). All stages, timelines, reels, and card stacks must derive dynamically from data arrays so adding or removing items automatically scales the DOM, CSS z-indexes, scroll distance, and timeline transitions without manual code edits.
