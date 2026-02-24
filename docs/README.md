# KVN Sec School — Documentation

Documentation for the **KVN Sec School** (Krishna Vidhya Niketan Sec School) website, Bikaner, Rajasthan 334001.

## Docs index

| Document | Purpose |
|----------|--------|
| **[DESIGN.md](./DESIGN.md)** | Vision, brand, user roles, main screens (landing with photo carousel, navbar, About, Academics, login), tech stack, inspiration from school websites. |
| **[STRUCTURE.md](./STRUCTURE.md)** | Codebase structure: `app/`, `components/`, `hooks/`, `lib/` (including `lib/db/` and `lib/svc/`), `types/`. Same modular approach as the hospital-management reference project. |
| **[DATABASE.md](./DATABASE.md)** | **DB table convention** (id, entity_pid, created_at, updated_at, is_deleted), **DB layer vs service (svc) layer**, GORM-style CRUD + filters, Neon + Vercel. |
| **[PROJECT-PLAN.md](./PROJECT-PLAN.md)** | Phases, milestones, and step-by-step tasks. Start with Phase 1 (scaffold → navbar → landing + carousel → About & Academics → login placeholders). |
| **[LOCAL-SETUP.md](./LOCAL-SETUP.md)** | How to run the project locally (Node, pnpm, `pnpm dev`). |

## Quick start

1. Read **DESIGN.md** for the big picture.
2. Use **STRUCTURE.md** when adding or locating code.
3. Follow **PROJECT-PLAN.md** milestones to build the site in order.
4. Use **LOCAL-SETUP.md** to run the app on your machine.
5. For UI (shadcn/ui, modular components, reuse), follow **.cursor/skills/kvn-school-ui/**.
6. For DB (GORM-style DB functions, svc layer, Neon, Vercel), follow **.cursor/skills/kvn-school-db/**.

## Reference

This project’s structure and documentation style are aligned with:

- `/Users/mohit/Documents/project/hospital-management/docs` (STRUCTURE, DESIGN, LOCAL-SETUP, deployment).
