# dcd. portfolio design

## Purpose and confirmed scope
Build a portfolio for a four-developer team using React, TypeScript, Tailwind CSS, and GSAP. Showcase the three supplied projects and their engineering details. The user requires close UI/UX and animation fidelity to https://piergorelli.com/, adapted to dcd. branding and factual project content.

## Reference fidelity
Use the observed near-black canvas, off-white sans-serif typography, thin blue construction lines, generous hero whitespace, compact monospace measurements, numbered navigation, pill-shaped actions, and a command menu over a blurred page. Include light/dark and grid controls. Do not use the earlier paper/orange proposal. The dcd. wordmark replaces the reference identity.

## Page and component structure
App contains Header, Hero, Manifesto, SelectedWork, Team, Footer, and ShortcutMenu. Header links to Work, Approach, and Team. Hero introduces four developers building connected systems and links to the work. Manifesto pairs production typography with blueprint annotations. SelectedWork exposes three project dossiers, each with overview, supplied stack, workflow diagram, and expandable engineering details. Use supplied Helmet Cartel imagery; other projects use clearly identified architectural diagrams until screenshots are supplied. Team has four explicitly unnamed member slots, without invented identities or biographies. Footer provides navigation; no fabricated email address.

## Project truth
Samson Dental Center: Healthcare Management Platform; ASP.NET Core, React, PostgreSQL, SignalR; role-based clinical workflows, scheduling, EHR, and real-time appointment sync. URL: https://samsondentalcenter-website.chrbuilds.dev.
Hole In Hub Golf & Lounge: Entertainment & Hospitality ERP; PERN, Supabase, Express.js, Tailwind CSS; POS, bay reservations, inventory, billing. URL: https://holeinhub-ptp.vercel.app.
Helmet Cartel Merchandise: Retail Operations & Storefront System; ASP.NET Web Forms, C#, SQL Server, Chart.js; brand filters, revenue and sales velocity, stock notifications, audit logs. Public URL not supplied.

## Motion and interaction
GSAP intro progresses from drafting lines to production typography. Scroll-driven blueprint annotations and project transitions follow the reference pacing. Hero typing telemetry is illustrative and must not imply real measurements. Command menu supports Ctrl/Cmd K, search, arrow-key selection, Enter, Escape, focus containment and restoration. Grid toggle supports Alt G. Theme toggle remains keyboard accessible. Project details work with pointer and keyboard. Reduced-motion users receive static content with no typing or scroll choreography. All content remains visible if animation initialization fails.

## Delivery and verification
Use Vite as the minimal React build setup. No backend, database integration, invented metrics, or external publishing. Verify TypeScript and production build; test command menu behavior, toggles, details, reduced motion, mobile overflow, and external links. Inspect desktop and mobile captures in one batch, fix material defects, and confirm once. Record component hierarchy and run instructions.

## Open content
Four member names/roles, contact destination, Helmet Cartel public URL, and screenshots for the first two projects are not supplied.
