# Verification

- `npm run build`: passed TypeScript and Vite production bundle (36 modules).
- `tests/smoke.mjs`: executed using the documented Codex CUA tab API; 9 menu/keyboard/theme/grid/disclosure/image/layout checks passed.
- Viewports: 1280×720 desktop and 390×844 mobile; no horizontal document overflow.
- Impeccable detector: one run on App.tsx and index.css, returned [].
- Reduced motion: source-verified GSAP matchMedia and CSS media query; OS preference emulation unavailable in the browser API used.
- Exact source animation parity and remote project availability were not certified. No public deployment.
- Full-page IAB captures reflowed svh; final review uses actual viewport and section captures instead.

Hero revision: 12 revised CUA smoke checks passed; two unwrapped statement lines confirmed at 1559px and 390px. Desktop paragraph/action centers align within 2px. Scroll test moved from y=1349 to y=1660 while the Samson blueprint path dash offset changed from 1821px to 139px. Removed header controls are absent; shortcuts retained. Native reduced-motion bypass is source-verified, not OS-emulated.
Final review correction: manifesto outline base is transparent; overlay supplies progressive foreground fill, with a visible default for reduced motion. Browser computed base rgba(0,0,0,0). Back-to-top now targets the root: scrollY=0 and headerTop=0. Final build and 12 smoke checks passed again.
Latest layout revision: production build passed; 16 revised CUA interaction checks passed. At 1559x948 the hero/footer ends at viewport bottom, sticky header stays at y=0, and approach scene pins at y=110. At 390x844 there is no horizontal overflow, no pin spacer, and hero footer ends at y=844. Removed metadata/TEAM labels are absent. Navbar ruler displays live scroll percentage.
