# Architecture & Code Organization Guidelines

## Reference Source of Truth
Visual and interaction standards reference [piergorelli.com](https://piergorelli.com/).
When adding or updating UI:
- Replicate the technical blueprint aesthetic (coordinate crosshairs, monospace annotations, crisp hairline borders).
- Maintain Lenis + GSAP ScrollTrigger alignment with smooth-scroll durations (1.05s) and scrub values (0.35s to 0.9s).
- Ensure native fallback for mobile (<760px) and reduced motion (`prefers-reduced-motion: reduce`).

---

## Directory Layout
Every file in `src/` must live in its designated domain to ensure scalability and team consistency:

```text
src/
├── components/          # React UI components
│   ├── common/          # Atomic, stateless shared UI (Arrow, Button, Icon)
│   ├── layout/          # Page chrome & persistent layout elements (Header, Footer, Cursor)
│   ├── navigation/      # Navigation overlays (ShortcutDialog, Command Palette)
│   ├── sections/        # Major page landmarks (Hero, Approach, WorkStage, Services, Team)
│   └── work/            # Domain-specific work & diagram renderers (Blueprint, ProjectArt)
├── data/                # Static data models and content arrays (projects, services, navigation)
├── hooks/               # Encapsulated stateful lifecycle logic (useTheme, useCursor, useLenisScroll, useShortcuts)
├── styles/              # Modular domain stylesheets (tokens, base, cursor, header, hero, etc.)
├── types/               # TypeScript interfaces, types, and ambient declarations
├── App.tsx              # Root orchestration shell (<80 lines)
├── index.css            # Central import hub (<15 lines)
└── main.tsx             # Application bootstrap entry
```

---

## Component Rules
1. **Single Responsibility**: Each component represents a single identifiable DOM landmark or interactive element.
2. **Prop Transparency**: Components accept explicit, strongly typed props via TypeScript interfaces.
3. **No Direct Mutative Globals**: All window and DOM listeners must be managed inside `useEffect` with corresponding teardown/cleanup functions.
4. **Decoupled Data**: Never hardcode project lists, services, or navigation menus directly inside component JSX; import them from `src/data/`.
5. **Dynamic Scalability**: Never hardcode element counts, indices, or fixed lengths (e.g. `[data-index="0|1|2"]`, `panels[0]`, `/03`). Structure markup, grid columns, counters, and z-indexes to derive dynamically from data arrays so adding or removing items automatically scales without manual JSX or CSS edits.

---

## Hook Rules
1. Encapsulate third-party library integrations (GSAP, Lenis) into hooks so components remain clean and declarative.
2. Always pair event listeners and animation ticker subscriptions with cleanup logic in return statements.
3. Respect user settings: Check `(prefers-reduced-motion: reduce)` before registering GSAP scrubbing or Lenis smooth-scrolling.
4. **Data-Driven Pinned Animations**: Scrubbed pinned timelines must loop dynamically over data arrays, scale pin track distance proportionally to item count (`innerHeight * (count * 2.2)`), allocate $\ge 80\%$ of timeline duration to steady rest plateaus, and map stage fill progress evenly over each item's active window.
