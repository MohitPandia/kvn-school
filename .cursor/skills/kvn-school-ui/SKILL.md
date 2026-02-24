---
name: kvn-school-ui
description: Use shadcn/ui for UI and follow modular, reusable component patterns when building the KVN Sec School Next.js app. Use when implementing pages, forms, or components for kvn-school, or when the user mentions shadcn, UI components, or modular components.
---

# KVN School — UI & component procedure

## UI stack

- **Use [shadcn/ui](https://ui.shadcn.com)** for all UI primitives to minimize development work and keep a consistent look.
- Add components via the CLI: `npx shadcn@latest add button card input ...` (or the project’s preferred command). Prefer adding only what the current feature needs.
- Components live in `src/components/ui/` (or `components/ui/`). Do not copy-paste from the docs into random folders; use the CLI so styles and deps stay in sync.
- Styling: Tailwind CSS. shadcn components are themeable via CSS variables; keep overrides in the project’s global theme file.

## Modular components — create and reuse

1. **Prefer reuse over new**
   - Before creating a new component, check `components/ui/` and feature folders (`components/landing/`, `components/layout/`, etc.) for something that can be reused or extended.
   - Use shadcn primitives first; wrap or compose them only when the same pattern repeats.

2. **Where to put components**
   - **`components/ui/`** — Generic, reusable primitives (shadcn components plus any project-wide wrappers like `PageHeader`, `LoadingState`). No page-specific logic.
   - **`components/layout/`** — Navbar, Footer, shell layout. Use `components/ui` inside them.
   - **Feature folders** (e.g. `components/landing/`, `components/about/`) — Page/section-specific blocks. Compose from `components/ui/` and optionally `components/layout/`.

3. **Composition**
   - Build complex UIs by composing small components. Pages should mostly import and arrange components, not contain large inline JSX.
   - Pass data and callbacks via props; avoid duplicating the same JSX in multiple places. If the same structure appears twice, extract a component.

4. **Naming and exports**
   - One main component per file (or a small, related group). File name matches the component name (e.g. `PageHeader.tsx` → `PageHeader`).
   - Export the component as the default (or named) and keep a single responsibility so the component stays reusable.

## Procedure for adding or changing UI

Use this order so any agent (or developer) can follow it consistently:

1. **Requirement**
   - Clarify what the page or block should show and do (e.g. “login form”, “carousel”, “navbar”).

2. **Check existing**
   - Search `components/ui/` and relevant feature folders for components that already cover the need. Reuse or extend; only add new files when necessary.

3. **Add shadcn components if needed**
   - If a primitive is missing (e.g. `Button`, `Card`, `Input`, `Form`), add it via shadcn CLI into `components/ui/`. Do not reimplement what shadcn provides.

4. **Implement or compose**
   - For **generic** patterns (used in more than one place), add or update a component in `components/ui/` or `components/layout/`.
   - For **page-specific** blocks, add or update a component in the right feature folder and compose from `components/ui/`.

5. **Use in the page**
   - In the page file (`app/.../page.tsx`), import and compose the feature/layout components. Keep the page thin (no heavy logic; use hooks for state or data).

6. **Verify**
   - Ensure no duplicate implementations of the same UI pattern; any repeated structure should be a shared component.

## Quick reference

| Need | Action |
|------|--------|
| Button, input, card, form, etc. | Use shadcn; add via CLI to `components/ui/`. |
| New reusable pattern | Add to `components/ui/` or `components/layout/`; compose from shadcn. |
| New page section | Add to the right feature folder; compose from `components/ui/`. |
| Same JSX in 2+ places | Extract a component and reuse it. |

## Project docs

- **docs/STRUCTURE.md** — Full folder layout and where components live.
- **docs/DESIGN.md** — Screens, routes, and tech stack (shadcn listed as UI choice).
- **docs/PROJECT-PLAN.md** — Phases and milestones.

When working on KVN School UI, follow this skill and the project docs so the codebase stays modular and consistent.
