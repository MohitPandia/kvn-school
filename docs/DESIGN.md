# KVN Sec School — Design Document

## 1. Overview

**KVN Sec School** (Krishna Vidhya Niketan Sec School) is a school website for **KVN Sec School, Bikaner, Rajasthan 334001**. The site serves as the public face of the school and a gateway for students, teachers, and parents.

**Goals:**
- Present the school professionally with a welcoming landing page.
- Showcase the school community (staff and students) through photos and content.
- Provide clear entry points: **Student login**, **Teacher login**, **About us**, **Academics**.
- Be mobile-friendly and easy to navigate (aligned with modern school website best practices).

---

## 2. Brand & Identity

| Item | Value |
|------|--------|
| **Full name** | Krishna Vidhya Niketan Sec School |
| **Short name** | KVN Sec School |
| **Location** | Bikaner, Rajasthan 334001 |
| **Audience** | Students, teachers, parents, prospective families, alumni |

The site should feel trustworthy, warm, and educational—reflecting a school environment.

---

## 3. User Roles & Entry Points

| Audience | Who | What they do |
|----------|-----|----------------|
| **Public / Visitor** | Anyone | View landing page, About us, Academics info, photo gallery. |
| **Student** | Enrolled student | Use **Student login** → (future: dashboard, assignments, results, etc.). |
| **Teacher** | School staff | Use **Teacher login** → (future: class management, attendance, etc.). |
| **Parent** | Guardian | Browse public info; (later) may have parent login or link from student flow. |

For the first phase, **Student login** and **Teacher login** can be **entry points** (routes + placeholder or simple login UI). Full auth and dashboards can come in later phases.

---

## 4. Main Screens & Routes

### 4.1 Public (no login)

| Screen | Route | Description |
|--------|--------|-------------|
| **Landing** | `/` | Hero area + **photo carousel/gallery** of school staff and students. Navbar on top. Sections for quick facts, highlights, or calls-to-action. |
| **About us** | `/about` | School history, mission, vision, leadership, contact, location (Bikaner, 334001). |
| **Academics** | `/academics` | Curriculum, classes, programs, academic calendar (content can be static at first). |

### 4.2 Navbar (global)

The **navbar** appears on all pages and includes:

- **Student login** → `/login/student` (or `/student/login`)
- **Teacher login** → `/login/teacher` (or `/teacher/login`)
- **About us** → `/about`
- **Academics** → `/academics`

Optional later: Home, Contact, Gallery, News/Events.

### 4.3 Auth (placeholders in Phase 1)

| Screen | Route | Description |
|--------|--------|-------------|
| Student login | `/login/student` | Login form for students (can be placeholder UI initially). |
| Teacher login | `/login/teacher` | Login form for teachers (can be placeholder UI initially). |

After login (later phases): redirect to role-specific dashboards.

---

## 5. Landing Page — Content & Inspiration

Based on common patterns from existing school and college websites:

- **Hero section**  
  Strong first impression: school name (KVN Sec School / Krishna Vidhya Niketan), tagline, and optionally a background image or video.

- **Photo carousel / gallery**  
  **Running photos of school staff and students** — this is a primary requirement. Use a carousel or grid that cycles through or showcases life at school. Prefer high-quality, genuine photos.

- **Trust and clarity**  
  - Short “Why choose us” or “Fast facts” (e.g. years of experience, number of students, facilities).  
  - Clear **calls-to-action**: e.g. “Student login”, “Teacher login”, “Explore Academics”, “About us”.

- **Readability**  
  Clear headings, short paragraphs, bullet points or cards for programs. Mobile-friendly layout.

- **Visual identity**  
  Consistent colours, logo placement, and typography so the site feels like one brand.

---

## 6. Tech Stack (aligned with reference project)

| Layer | Choice |
|--------|--------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI** | **shadcn/ui** for primitives (minimize dev work); modular, reusable components (see STRUCTURE.md and **.cursor/skills/kvn-school-ui/** for procedure) |
| **Auth (later)** | NextAuth.js or similar (email/password or school-specific) |
| **Database (later)** | Neon Postgres or similar, if needed for users, notices, events |
| **Hosting** | Vercel (recommended for Next.js) |

Same approach as the hospital-management project: **modular structure**, thin pages, components in dedicated folders, API under `app/api/`, shared types and lib utilities.

---

## 7. Data & Content (Phase 1 vs later)

- **Phase 1:**  
  - **Static content**: About us, Academics text and images can be in code or Markdown/JSON.  
  - **Photos for carousel**: Static assets (e.g. in `/public`) or a small JSON list of image paths.  
  - **No database required** for the first milestone; optional later for news, events, notices.

- **Later:**  
  - User accounts (students, teachers), login, dashboards.  
  - Optional: CMS or admin panel for updating news, events, and gallery.  
  - Optional: contact form with storage or email.

---

## 8. Data model — tables

When you introduce a database (e.g. Phase 3 for auth, or earlier for dynamic content), use the following tables. Phase 1 does **not** require any of these; they are for future implementation.

**Standard columns (every table):** `id` (auto-increment PK), `{entity}_pid` (unique, prefix-based), `created_at`, `updated_at`, `is_deleted`. See **docs/DATABASE.md** for the full convention, pid generation, and the **DB layer vs service (svc) layer** approach.

### 8.1 Auth & users

| Table | Purpose | Main columns (suggested) |
|-------|--------|---------------------------|
| **users** | Login and role for everyone (student, teacher, admin). | `id`, `user_pid` (e.g. prefix `KVN-USR-`), `email`, `password_hash`, `role` (`student` \| `teacher` \| `admin`), `created_at`, `updated_at`, `is_deleted` |
| **students** | Student profile linked to a user. | `id`, `student_pid` (e.g. prefix `KVN-STU-`), `user_id` (FK → users), `roll_no`, `full_name`, `class`, `section`, `parent_contact`, `admission_date`, `created_at`, `updated_at`, `is_deleted` |
| **teachers** | Teacher profile linked to a user. | `id`, `teacher_pid` (e.g. prefix `KVN-TCH-`), `user_id` (FK → users), `employee_id`, `full_name`, `subject` or `department`, `joined_at`, `created_at`, `updated_at`, `is_deleted` |

- **students:** `id` auto-increment; `student_pid` generated with prefix (e.g. `KVN-STU-00001`). See DATABASE.md §2.  
- One **user** row per login; **students** and **teachers** extend with school-specific data.  
- For “Student login”, use a unique identifier (e.g. `roll_no` + password) and resolve to `users` + `students`.  
- Optional: **sessions** if you store server-side sessions in DB; otherwise NextAuth can use JWT.

### 8.2 Content & public-facing

| Table | Purpose | Main columns (suggested) |
|-------|--------|---------------------------|
| **notices** | Announcements (e.g. holidays, exams, events). | `id`, `notice_pid`, `title`, `body` (text), `for_audience` (`all` \| `student` \| `teacher` \| `parent`), `published_at`, `created_by` (FK → users), `created_at`, `updated_at`, `is_deleted` |
| **events** | School events (annual day, sports day, parent meeting). | `id`, `event_pid`, `title`, `description`, `event_date`, `location`, `created_at`, `updated_at`, `is_deleted` |
| **carousel_images** | Images for the landing-page photo carousel. | `id`, `carousel_image_pid`, `image_url` (path or URL), `caption`, `sort_order`, `created_at`, `updated_at`, `is_deleted` |
| **gallery_albums** (optional) | Grouped gallery (e.g. “Annual Day 2024”). | `id`, `gallery_album_pid`, `title`, `description`, `cover_image_url`, `created_at`, `updated_at`, `is_deleted` |
| **gallery_images** (optional) | Photos inside an album. | `id`, `gallery_image_pid`, `gallery_album_id` (FK), `image_url`, `caption`, `sort_order`, `created_at`, `updated_at`, `is_deleted` |

- **Phase 1:** Carousel can use static files + `lib/gallery.ts` (no table).  
- When you want admin to add/remove carousel images without code deploy, add **carousel_images**.  
- **notices** and **events** can power “News” / “Events” sections later.

### 8.3 Academic (later, optional)

| Table | Purpose | Main columns (suggested) |
|-------|--------|---------------------------|
| **classes** | Class/section definition (e.g. Class 10-A). | `id`, `class_pid`, `name`, `academic_year`, `created_at`, `updated_at`, `is_deleted` |
| **subjects** | Subjects offered. | `id`, `subject_pid`, `name`, `code`, `created_at`, `updated_at`, `is_deleted` |
| **assignments** (optional) | Assignments per class/subject. | `id`, `assignment_pid`, `class_id`, `subject_id`, `title`, `description`, `due_at`, `created_by`, `created_at`, `updated_at`, `is_deleted` |
| **attendance** (optional) | Daily attendance. | `id`, `attendance_pid`, `student_id`, `date`, `status` (`present` \| `absent` \| `leave`), `marked_by`, `created_at`, `updated_at`, `is_deleted` |
| **results** (optional) | Marks/grades. | `id`, `result_pid`, `student_id`, `exam_name`, `subject_id`, `marks` / `grade`, `academic_year`, `created_at`, `updated_at`, `is_deleted` |

These are only needed when you build student/teacher dashboards with assignments, attendance, or results.

### 8.4 Summary — when to introduce

| Phase | Tables to use |
|-------|----------------|
| **Phase 1** | None (static content, carousel from `/public` + config). |
| **Phase 2** | Optional: **carousel_images**, **notices**, **events** for dynamic content. |
| **Phase 3 (auth)** | **users**, **students**, **teachers** (and sessions if stored in DB). |
| **Later** | **notices**, **events**, **gallery_***; optionally **classes**, **subjects**, **assignments**, **attendance**, **results**. |

---

## 9. Security & Privacy (when auth is added)

- **Public pages**: No auth; everyone can view landing, About, Academics.  
- **Student/Teacher routes**: Protected by session; only logged-in users with the right role see their dashboard.  
- **No sensitive data** on public pages; student/teacher data only after login.

---

## 10. Summary

| Item | Choice |
|------|--------|
| **Site** | Single Next.js app; public pages + login entry points. |
| **Landing** | Hero + **photo carousel of staff and students** + CTAs; navbar on top. |
| **Navbar** | Student login, Teacher login, About us, Academics. |
| **Structure** | Follow hospital-management style: `app/`, `components/`, `hooks/`, `lib/`, `types/`. |
| **Phase 1** | Landing, navbar, About us, Academics, login placeholders; static content and images; **no DB**. |
| **Tables** | See **§8 Data model** — id, entity_pid, created_at, updated_at, is_deleted on every table; **DATABASE.md** for convention and DB + svc layers. |
| **Later** | Auth, dashboards, optional DB/CMS, contact form, deploy (e.g. Vercel). |

Next steps: define **codebase structure** (STRUCTURE.md), then **step-by-step plan and milestones** (PROJECT-PLAN.md).
