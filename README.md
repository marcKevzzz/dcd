# dcd. portfolio

React + TypeScript + Tailwind CSS + GSAP, built with Vite.

Run `npm install`, then `npm run dev`. Run `npm run build` for a production bundle in `dist/`.

Component hierarchy: App → Header, Hero, Manifesto, SelectedWork → ProjectDossier → Blueprint, Team, Footer, ShortcutMenu. Static page sections live in App.tsx; ProjectDossier and Blueprint isolate repeated project behavior. Project content is held in the typed projects array at the top of App.tsx. Design tokens and responsive styles live in index.css, with Tailwind used for small layout utilities.

Shortcuts: Ctrl/Cmd K opens searchable navigation; The header theme control works by pointer; The blue circle and command button have been removed from the header as requested. Native dialog provides focus containment; arrow keys and Enter select commands. Escape restores focus. GSAP honors reduced motion and cleans up on unmount.

Content to supply: team names and roles, contact destination, Helmet Cartel URL, and screenshots for Samson Dental Center and Hole In Hub. Their current visuals are explicitly conceptual workflow diagrams. Helmet Cartel images are the user-supplied captures, copied unchanged from the attachments. No backend or credentials are required.

Visual direction follows the supplied piergorelli.com reference, adapted to dcd. content. It is an independently implemented interpretation; exact original timing and source effects are not claimed.

Hero: two statement lines, “Decide & design.” and “Code. Deploy.”; paragraph and actions share a desktop row and stack on mobile. Lenis runs on the GSAP ticker and feeds ScrollTrigger, with native touch scrolling and a reduced-motion bypass.

Decorative page grids, hero bounding boxes, diagram grid patterns, and the grid toggle/shortcut have been removed.

Latest layout: bottom-aligned hero with metadata removed; narrow gutters and outer edge rules; sticky navbar progress ruler; oversized staggered approach with expanded copy and a 125vh desktop pin. Mobile and reduced-motion users retain normal document flow.
