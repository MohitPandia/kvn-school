# Database structure & architecture

This document defines the **table structure convention** and the **layered approach**: **DB layer** (database functions) separate from a **service (svc) layer** that interacts with the DB. API routes and pages use the **service layer only**, not the DB layer directly.

**Stack:** **Neon** (serverless Postgres) and **Vercel** for hosting—same as the reference project (hospital-management). Use `DATABASE_URL` (or `POSTGRES_URL`) and the Neon serverless driver (e.g. `@neondatabase/serverless`). See **DEPLOY-VERCEL.md** for deploy and env.

**GORM-style approach:** As in Go with GORM, the **DB layer** exposes **functions** that perform **CRUD and filters** (e.g. `insertStudent`, `getStudentByPid`, `listStudents(db, filters)`). The svc layer **calls these DB functions** and applies validation, pid generation, and orchestration. All query building and execution (including WHERE/filters) happens in the DB layer; svc only passes filter/query parameters. For the full procedure, see **.cursor/skills/kvn-school-db/**.

---

## 1. Standard table structure

Every table must include these columns:

| Column       | Type        | Purpose |
|-------------|-------------|---------|
| **id**      | Auto-increment (PK) | Internal primary key. Never expose as the only identifier in APIs; use `*_pid` for external reference. |
| **{entity}_pid** | VARCHAR, unique | Public/domain ID with a prefix (e.g. `student_pid`). Used in URLs, APIs, and external references. |
| **created_at**  | TIMESTAMP   | Set on insert (e.g. `DEFAULT NOW()`). |
| **updated_at**  | TIMESTAMP   | Set on insert and on every update. |
| **is_deleted**  | BOOLEAN     | Soft delete. Default `false`. When “deleting”, set to `true` instead of removing the row. |

- **Naming:** For table `students`, the pid column is `student_pid`; for `teachers`, `teacher_pid`; for `notices`, `notice_pid`, etc.
- **Queries:** All reads that are “active” data must filter `WHERE is_deleted = false` (or `IS NOT TRUE`) unless you explicitly need deleted records (e.g. admin audit).

---

## 2. Example: `students` table

| Column         | Type           | Notes |
|----------------|----------------|--------|
| id             | SERIAL PRIMARY KEY | Auto-increment. |
| student_pid    | VARCHAR(32) UNIQUE NOT NULL | Generated with prefix, e.g. `KVN-STU-00001`. |
| user_id        | INT (FK → users.id) | Optional; link to auth. |
| roll_no        | VARCHAR(32)   | School roll number. |
| full_name      | VARCHAR(255)  | |
| class          | VARCHAR(32)   | e.g. "10", "9-A". |
| section        | VARCHAR(16)   | Optional. |
| parent_contact | VARCHAR(64)   | Optional. |
| admission_date | DATE          | Optional. |
| created_at     | TIMESTAMP     | DEFAULT NOW(). |
| updated_at     | TIMESTAMP     | DEFAULT NOW(), updated on every change. |
| is_deleted     | BOOLEAN       | DEFAULT false. |

**Generating `student_pid`:** Use a prefix (e.g. `KVN-STU-`) plus a padded sequence or unique suffix. Examples:

- `KVN-STU-00001`, `KVN-STU-00002`, … (from a sequence or `SELECT MAX(id) + 1` with padding).
- Or `KVN-STU-` + short random/id (e.g. nanoid) to avoid sequence contention.

Generation should happen in **service layer** (or a small DB helper) before insert; the DB layer only receives the final value.

---

## 3. Architecture: DB layer vs service layer

- **DB layer** — Only talks to the database. Exposes **DB functions** that run SQL (raw or via a query builder). Each function performs **CRUD or filtered reads** (e.g. `listStudents(db, filters)` builds WHERE from `filters` and runs the query). No business logic, no validation; just CRUD and filters.
- **Service layer (svc)** — **Calls DB functions only.** Builds filter objects from request/input and passes them to the DB layer. Validation, pid generation, and “orchestration” of multiple DB calls live here. API routes and server code call the **service layer**, never the DB layer.

Flow:

```
API route / Page (server)  →  Service layer (svc)  →  DB layer (db)  →  Database
```

- **Never:** API route → DB layer directly.  
- **Always:** API route → Service → DB (when data is needed).

This keeps DB access in one place, makes testing and swapping implementations easier, and keeps API handlers thin.

---

## 4. Where things live in the codebase

| Layer    | Location (e.g. under `src/`) | Responsibility |
|----------|------------------------------|----------------|
| **DB**   | `lib/db/` or `src/db/`       | Functions that execute SQL. One file per entity or group (e.g. `students.ts`, `teachers.ts`, `notices.ts`). |
| **Service** | `lib/svc/` or `src/svc/`  | Functions that call DB and implement business logic (e.g. `createStudent`, `getStudentByPid`, `listNotices`). One file per domain (e.g. `student.ts`, `teacher.ts`, `notice.ts`). |
| **API**  | `app/api/`                   | Route handlers: parse request, call **svc**, return response. No direct DB calls. |

See **STRUCTURE.md** for the full folder layout.

---

## 5. How to proceed when adding a table or feature

### Step 1: Define the table

- Add columns per **§1** (id, `{entity}_pid`, created_at, updated_at, is_deleted) plus entity-specific columns.
- Document in **DESIGN.md** (§8 Data model).
- Create migration or schema (e.g. SQL or Drizzle/Prisma migration).

### Step 2: DB layer

- In `lib/db/` (or `src/db/`), add or extend a file for that entity (e.g. `students.ts`).
- Implement **DB-only** functions that perform **CRUD and filters** (GORM-style). For example:
  - `insertStudent(db, row)` — insert one row; `row` includes `student_pid`, timestamps, etc.
  - `getStudentById(db, id)` — by primary key; optionally exclude `is_deleted`.
  - `getStudentByPid(db, studentPid)` — by `student_pid`; exclude deleted unless required.
  - `listStudents(db, filters)` — **build WHERE from `filters`** (e.g. `{ class: '10', is_deleted: false }`) and run the query; return rows. All filter logic and query building stay in the DB layer.
  - `updateStudent(db, id, partial)` — update `updated_at` and given fields.
  - `softDeleteStudent(db, id)` — set `is_deleted = true`, `updated_at = NOW()`.
- All reads for “active” data should filter `is_deleted = false` inside the DB layer unless the function name/documentation says otherwise.

### Step 3: Service layer

- In `lib/svc/` (or `src/svc/`), add or extend a file (e.g. `student.ts`).
- Implement **service** functions that use the DB layer, e.g.:
  - `createStudent(data)` — generate `student_pid` (prefix + sequence/unique), set `created_at`/`updated_at`, call `db.insertStudent`.
  - `getStudentByPid(studentPid)` — call `db.getStudentByPid`; return or throw NotFound.
  - `listStudents(filters)` — call `db.listStudents` with filters and `is_deleted = false`.
  - `updateStudent(pid, data)` — resolve pid to id if needed, then `db.updateStudent`.
  - `deleteStudent(pid)` — resolve to id, then `db.softDeleteStudent`.
- Put validation, pid generation, and any cross-entity logic here, not in the DB layer.

### Step 4: API / routes

- In `app/api/...`, handlers:
  - Parse and validate input (e.g. body, query).
  - Call **service** functions only (e.g. `getStudentByPid(pid)`).
  - Map result to response (JSON, status codes).
- Do **not** import or call DB layer from API routes.

### Step 5: Types

- In `types/` (e.g. `domain.ts` or `db.ts`), define:
  - Row types (e.g. `StudentRow` with id, student_pid, created_at, updated_at, is_deleted, …).
  - DTOs for API (e.g. `StudentResponse` with `student_pid` instead of `id` if you hide internal id).
- Use these in both DB and svc layers for type safety.

---

## 6. Summary

| Item | Rule |
|------|------|
| **Table columns** | Every table: `id` (auto-increment), `{entity}_pid` (unique, prefix-based), `created_at`, `updated_at`, `is_deleted`. |
| **Student example** | `id`, `student_pid` (e.g. `KVN-STU-00001`), … domain fields …, `created_at`, `updated_at`, `is_deleted`. |
| **Soft delete** | Use `is_deleted`; default all “active” queries to `is_deleted = false`. |
| **DB layer** | Separate module (`lib/db/` or `src/db/`); only SQL/query execution. |
| **Service layer** | Separate module (`lib/svc/` or `src/svc/`); calls DB, contains business logic and pid generation. |
| **Flow** | API/Route → **Service** → **DB** → Database. API never calls DB directly. |
| **Adding a feature** | 1) Table + migration, 2) DB functions (CRUD + filters), 3) Service functions, 4) API handlers, 5) Types. |
| **Stack** | Neon (Postgres) + Vercel; `DATABASE_URL`; use Neon serverless driver. See DEPLOY-VERCEL.md. |
| **Procedure for agents** | See **.cursor/skills/kvn-school-db/** for the DB and svc procedure (GORM-style, Neon, Vercel). |

For the full list of tables and columns, see **DESIGN.md** (§8 Data model). For folder layout, see **STRUCTURE.md**.
