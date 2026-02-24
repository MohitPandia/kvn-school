# Codebase structure (KVN Sec School)

Modular layout for easier scaling and new features, aligned with the hospital-management project approach.

## `/src`

### `app/`

- **Page routes**: `page.tsx` files are thin; they compose **components** and **hooks**.
- **Layouts**: `layout.tsx` for the shared shell (navbar + main content). Root layout wraps the whole app; optional nested layouts for auth areas.
- **API routes**: Under `app/api/` when needed. Handlers stay thin; auth and validation here, business logic in `lib/` where needed.

**Suggested routes:**

- `app/page.tsx` — Landing (hero + photo carousel)
- `app/about/page.tsx` — About us
- `app/academics/page.tsx` — Academics
- `app/login/student/page.tsx` — Student login
- `app/login/teacher/page.tsx` — Teacher login

### `components/`

- **`ui/`** – **shadcn/ui** primitives (add via `npx shadcn@latest add <component>`) plus any project-wide wrappers (e.g. `PageHeader`, `LoadingState`). Use these for consistency; create and reuse components instead of duplicating UI. See **.cursor/skills/kvn-school-ui/** for the UI and modular-component procedure.
- **`layout/`** – Shared layout pieces: `Navbar`, `Footer` (optional). Navbar contains links to Student login, Teacher login, About us, Academics.
- **`landing/`** – Landing-specific: `Hero`, `PhotoCarousel` (or `PhotoGallery`), `QuickFacts`, `CallToActionSection`.
- **`about/`** – About page: `AboutIntro`, `MissionVision`, `ContactBlock`, etc.
- **`academics/`** – Academics page: `CurriculumSection`, `ProgramsList`, etc.

Add new features by adding components in the right group (or a new folder, e.g. `components/gallery/`) and importing in pages.

### `hooks/`

- **`useCarousel`** – Control carousel state (current index, next/prev, auto-play) for the landing photo carousel.
- (Later) **`useSession`** – Auth state for student/teacher.
- (Later) **`useNews`**, **`useEvents`** – If we add dynamic content.

Keep pages free of heavy logic; put data-fetching and state in hooks.

### `lib/`

- **`constants.ts`** – School name, address, contact, social links.
- **`images.ts`** or **`gallery.ts`** – List of image paths or metadata for the landing carousel (can read from `/public` or config).
- (Later) **`api/`** – Client-side API helpers for auth, notices, events.
- (Later) **`auth.ts`**, **`auth-options.ts`** – NextAuth config and helpers.
- (Later) **`db.ts`** – Database client (single place for connection; used only by `lib/db/`).

**DB and service layers (see docs/DATABASE.md):**

- **`lib/db/`** – **DB layer.** Functions that run SQL only (e.g. `insertStudent`, `getStudentByPid`, `softDeleteStudent`). One file per entity or group (e.g. `students.ts`, `teachers.ts`). No business logic; all tables use `id`, `{entity}_pid`, `created_at`, `updated_at`, `is_deleted`.
- **`lib/svc/`** – **Service layer.** Functions that call `lib/db/` and implement business logic (e.g. pid generation, validation). One file per domain (e.g. `student.ts`, `teacher.ts`). API routes and server code **call only the service layer**, never the DB layer directly.

Flow: **API route → Service (svc) → DB (db) → Database.**

### `types/`

- **`domain.ts`** – Shared types: e.g. `NavItem`, `CarouselImage`, `SchoolInfo`. Later: `User`, `Student`, `Teacher` if we add auth.
- (Later) **`next-auth.d.ts`** – NextAuth session/user extensions.

Define new entities and DTOs in `types/` so components and API stay in sync.

### `public/`

- **Images**: Placeholder or real photos for carousel under e.g. `public/images/landing/` or `public/gallery/`.
- **Favicon**, **logo**: `public/logo.svg`, `public/favicon.ico`.

---

## Adding a new feature (no DB)

1. **Types** – Add or extend types in `types/`.
2. **API** (if needed) – Add route under `app/api/` and/or client helpers in `lib/api/`.
3. **Hook** (if state or data) – Add hook in `hooks/` that uses `lib/api` or local state.
4. **Components** – Add UI in `components/ui/` (generic) or a feature folder under `components/`.
5. **Page** – Compose components and hooks in a thin `page.tsx`.

## Adding a feature that uses the database

See **docs/DATABASE.md** for the full flow. In short:

1. **Table** – Define table with `id`, `{entity}_pid`, `created_at`, `updated_at`, `is_deleted` + domain columns; add migration.
2. **DB layer** – In `lib/db/`, add functions that run SQL only (insert, getByPid, update, softDelete, list with `is_deleted = false`).
3. **Service layer** – In `lib/svc/`, add functions that generate pid, validate, and call `lib/db/` (e.g. `createStudent`, `getStudentByPid`).
4. **API** – Route handlers call **svc** only, never **db** directly.
5. **Types** – Row and DTO types in `types/`.

---

## File tree (target, Phase 1)

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + children)
│   ├── page.tsx            # Landing
│   ├── about/
│   │   └── page.tsx
│   ├── academics/
│   │   └── page.tsx
│   └── login/
│       ├── student/
│       │   └── page.tsx
│       └── teacher/
│           └── page.tsx
├── components/
│   ├── ui/                 # Button, Card, etc.
│   ├── layout/             # Navbar, Footer
│   ├── landing/            # Hero, PhotoCarousel, etc.
│   ├── about/              # About page blocks
│   └── academics/          # Academics page blocks
├── hooks/
│   └── useCarousel.ts
├── lib/
│   ├── constants.ts
│   ├── gallery.ts          # or images.ts
│   ├── db/                 # DB layer: SQL only (Phase 3+)
│   │   ├── students.ts
│   │   ├── teachers.ts
│   │   └── ...
│   └── svc/                # Service layer: calls db, business logic (Phase 3+)
│       ├── student.ts
│       ├── teacher.ts
│       └── ...
├── types/
│   └── domain.ts
└── public/
    ├── images/
    │   └── landing/        # Carousel images
    ├── logo.svg
    └── favicon.ico
```

This keeps the same philosophy as the hospital project: clear separation, thin pages, reusable UI and layout components.
