# Contributing to dcd.

Thank you for contributing to the **dcd.** engineering portfolio. To maintain production stability and high velocity across team members, please adhere to these standards.

---

## 1. Development Workflow

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd dcd
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://127.0.0.1:5173` in your browser.

3. **Verify Before Committing**:
   ```bash
   npm run build
   ```
   Both the TypeScript compiler (`tsc -b`) and Vite production bundler must pass with zero errors.

---

## 2. Architecture & Code Organization

Keep code in its dedicated domain:
- `src/types/`: Shared TypeScript models and ambient declarations.
- `src/data/`: Static content and configuration arrays.
- `src/hooks/`: Stateful and lifecycle logic (GSAP/Lenis/DOM).
- `src/components/`:
  - `common/`: Reusable primitives (`Arrow`).
  - `layout/`: Persistent structure (`Header`, `Footer`, `Cursor`).
  - `navigation/`: Overlays and modals (`ShortcutDialog`).
  - `sections/`: High-level page sections (`Hero`, `Approach`, `WorkStage`, `Services`, `Team`).
  - `work/`: Project drawings and visuals (`Blueprint`, `ProjectArt`).
- `src/App.tsx`: Lean root orchestrator (<80 lines).

---

## 3. The Ponytail Mindset

We practice **Ponytail** engineering: *The best code is the code you never wrote.*
Before introducing code or abstractions, ask:
1. **YAGNI**: Does this actually solve an immediate requirement?
2. **Reuse**: Can existing components in `src/components/` or tokens in `index.css` handle it?
3. **Native First**: Can browser HTML5 or CSS solve this without extra JavaScript?
4. **No Gratuitous Dependencies**: Do not install new npm libraries.

---

## 4. Git Conventions

Use conventional commits:
- `feat: add <feature-description>`
- `fix: resolve <issue-description>`
- `refactor: simplify <component-or-hook>`
- `docs: update <documentation-description>`
- `style: refine <styles-or-tokens>`
