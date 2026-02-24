# KVN Sec School — Project plan, steps & milestones

This document breaks the work into phases, milestones, and concrete steps so we can build the site incrementally.

---

## Phase 1: Foundation & public site (no auth, no DB)

**Goal:** A live, presentable site with landing page (including photo carousel), navbar, About us, Academics, and login entry pages (placeholders).

### Milestone 1.1 — Project scaffold

- [ ] Create Next.js app (App Router, TypeScript, Tailwind, ESLint) in repo root.
- [ ] Add `src/` structure: `app/`, `components/`, `hooks/`, `lib/`, `types/`, `public/`.
- [ ] Add `lib/constants.ts` with school name (KVN Sec School / Krishna Vidhya Niketan), address (Bikaner, 334001), placeholder contact.
- [ ] Add `types/domain.ts` with at least `NavItem`, `CarouselImage` (or similar).
- [ ] Verify `pnpm dev` runs and the default page loads.

**Deliverable:** Clean Next.js + Tailwind base; no custom UI yet.

---

### Milestone 1.2 — Layout & navbar

- [ ] Create root `app/layout.tsx`: include global Navbar, main content area, optional Footer.
- [ ] Create `components/layout/Navbar.tsx` with links:
  - Student login → `/login/student`
  - Teacher login → `/login/teacher`
  - About us → `/about`
  - Academics → `/academics`
- [ ] Make Navbar responsive (mobile menu if needed).
- [ ] Use `lib/constants.ts` for school name in header/logo.

**Deliverable:** Every page shows the same navbar with the four items above.

---

### Milestone 1.3 — Landing page (hero + photo carousel)

- [ ] Create `app/page.tsx` as the landing page.
- [ ] Add `components/landing/Hero.tsx`: school name, short tagline, optional background.
- [ ] Add `components/landing/PhotoCarousel.tsx`: **running photos of school staff and students** (use images from `public/images/landing/` or placeholder assets).
- [ ] Add `hooks/useCarousel.ts` for current index, next/prev, optional auto-play.
- [ ] Add `lib/gallery.ts` (or `images.ts`) that exports list of carousel image paths.
- [ ] Optionally add a small “Quick facts” or “Why KVN” section and clear CTAs (Student login, Teacher login, About us, Academics).

**Deliverable:** Landing page with hero and a working photo carousel; navbar on top.

---

### Milestone 1.4 — About us & Academics pages

- [ ] Create `app/about/page.tsx`; compose `components/about/` (e.g. intro, mission/vision, contact, address).
- [ ] Create `app/academics/page.tsx`; compose `components/academics/` (e.g. curriculum, classes, programs — content can be placeholder text at first).
- [ ] Use shared `components/ui/` (e.g. `PageHeader`, `Card`) for consistency.
- [ ] Ensure both pages use the same root layout (navbar visible).

**Deliverable:** About us and Academics pages with static content; no backend.

---

### Milestone 1.5 — Login entry pages (placeholders)

- [ ] Create `app/login/student/page.tsx`: “Student login” heading + placeholder form (e.g. “Roll no / ID” + “Password” + “Login” button). No real auth yet.
- [ ] Create `app/login/teacher/page.tsx`: “Teacher login” heading + placeholder form (e.g. “Email” + “Password” + “Login” button). No real auth yet.
- [ ] Style consistently with the rest of the site; optional “Back to home” link.

**Deliverable:** Clicking “Student login” / “Teacher login” in navbar leads to these pages; forms do not submit to a backend yet.

---

### Phase 1 checklist (summary)

- [ ] Next.js + TypeScript + Tailwind + `src/` structure
- [ ] Navbar: Student login, Teacher login, About us, Academics
- [ ] Landing: hero + **photo carousel** (staff & students)
- [ ] About us & Academics pages (static)
- [ ] Student & Teacher login pages (placeholders)
- [ ] Mobile-friendly layout
- [ ] Content and images ready for first review (placeholder or real)

---

## Phase 2: Content & polish

**Goal:** Replace placeholders with real content and improve UX.

- [ ] Finalise copy for About us (history, mission, vision, contact).
- [ ] Finalise Academics content (curriculum, programs, calendar if needed).
- [ ] Add real photos for carousel (and any gallery section if added).
- [ ] Add favicon and logo; ensure branding is consistent.
- [ ] Optional: Footer with contact, address, social links.
- [ ] Optional: Contact form (static link to email or simple form that posts to API later).
- [ ] Accessibility and performance pass (alt text, headings, contrast).

---

## Phase 3: Auth & dashboards (later)

**Goal:** Real login for students and teachers; simple dashboards.

- [ ] Choose auth strategy (NextAuth.js with credentials or school-specific).
- [ ] Define user types: Student, Teacher (and optionally Admin).
- [ ] Add DB (e.g. Neon Postgres): users, roles, sessions.
- [ ] Implement Student login → redirect to `/dashboard/student` (placeholder or minimal dashboard).
- [ ] Implement Teacher login → redirect to `/dashboard/teacher` (placeholder or minimal dashboard).
- [ ] Protect dashboard routes; show “Not authorised” or redirect to login when not logged in.

---

## Phase 4: Deploy & maintain

**Goal:** Site live and easy to update.

- [ ] Deploy to Vercel (see `docs/DEPLOY-VERCEL.md` when created).
- [ ] Set production env (e.g. `NEXTAUTH_URL`, `NEXTAUTH_SECRET` when auth is added).
- [ ] Optional: custom domain (e.g. `kvnschool.com` or similar).
- [ ] Document how to update carousel images and static content (e.g. edit `lib/gallery.ts` and replace files in `public/`).

---

## Order of work (recommended)

1. **Milestone 1.1** — Scaffold  
2. **Milestone 1.2** — Layout & navbar  
3. **Milestone 1.3** — Landing (hero + carousel)  
4. **Milestone 1.4** — About us & Academics  
5. **Milestone 1.5** — Login placeholders  
6. **Phase 2** — Content & polish  
7. **Phase 3** — Auth (when ready)  
8. **Phase 4** — Deploy  

You can stop after Phase 1 and have a fully presentable school website; Phases 2–4 add content, auth, and go-live.
