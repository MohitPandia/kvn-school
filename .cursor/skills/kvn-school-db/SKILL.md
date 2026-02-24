---
name: kvn-school-db
description: Use the GORM-style DB function approach and svc layer for the KVN Sec School Next.js app. DB layer performs CRUD and filters; svc layer calls DB functions. Use Neon (Postgres) and Vercel. Use when adding tables, API that need data, or when the user mentions database, db, GORM, Neon, or Vercel.
---

# KVN School — Database procedure

## Stack

- **Database:** **Neon** (serverless Postgres). Use `@neondatabase/serverless` (or the project’s chosen client). Connection via `DATABASE_URL` (or `POSTGRES_URL`).
- **Hosting:** **Vercel.** Same setup as the reference project (hospital-management): env vars in Vercel, Neon connection string, no local DB required for deploy.
- **Local:** Use Neon’s URL for dev too, or optional Docker Postgres; see **docs/LOCAL-SETUP.md** and **docs/DEPLOY-VERCEL.md**.

## GORM-style DB function approach

In Go, GORM exposes a fluent API (e.g. `db.Where(...).Find(...)`, `db.Create(...)`). In this project we follow the **same idea** in TypeScript:

- **DB layer** (`lib/db/` or `src/db/`) exposes **functions** that perform **CRUD and filters**. Each function runs one or more queries (raw SQL or via a query builder). No business logic here—only building and executing queries.
- **Svc layer** (`lib/svc/` or `src/svc/`) **calls these DB functions** and adds validation, pid generation, and orchestration. API routes **never** call the DB layer; they call the svc layer only.

So: **API → svc → DB functions → Neon.** DB layer = “GORM-like” in the sense that all data access is through named functions that do Create, Read (with filters), Update, Delete (soft delete).

## Table convention (every table)

- **id** — Auto-increment PK.
- **{entity}_pid** — Unique, prefix-based (e.g. `student_pid` → `KVN-STU-00001`).
- **created_at**, **updated_at**, **is_deleted**.

All “active” reads must use `is_deleted = false`. Full details: **docs/DATABASE.md**.

## DB layer: what to implement

Per entity (e.g. `lib/db/students.ts`), add **DB-only** functions that perform:

- **Create:** `insertX(db, row)` — insert one row (pid, timestamps set by caller or default in SQL).
- **Read:** `getXById(db, id)`, `getXByPid(db, pid)`, `listX(db, filters)` — filters are plain objects (e.g. `{ class: '10', is_deleted: false }`). **Build the WHERE clause and run the query inside the DB layer**; svc just passes filter params.
- **Update:** `updateX(db, id, partial)` — set `updated_at` and given fields.
- **Delete (soft):** `softDeleteX(db, id)` — set `is_deleted = true`, `updated_at = now`.

Use parameterized queries (no string concatenation). Prefer a small query builder or `sql` tagged template if the project uses one; otherwise raw SQL with `?` or `$1` placeholders.

## Service layer: what to implement

Per domain (e.g. `lib/svc/student.ts`):

- Call **DB functions** only; no raw SQL in svc.
- **Validation** and **pid generation** (e.g. `KVN-STU-00001`) live here.
- **Filters** for list APIs: svc builds a filter object from query params or input, then calls `db.listX(db, filters)`. DB layer turns that into WHERE clauses and runs the query.
- Orchestration (e.g. create user + create student) stays in svc.

## Procedure for adding a data feature

1. **Table** — Define table with id, `{entity}_pid`, created_at, updated_at, is_deleted + domain columns. Document in **docs/DESIGN.md** (§8). Add migration (SQL or ORM migrations).
2. **DB layer** — In `lib/db/<entity>.ts`, add: insert, getById, getByPid, list (with filters), update, softDelete. All query building and execution in this file.
3. **Svc layer** — In `lib/svc/<domain>.ts`, add: create (generate pid, call insert), getByPid, list (build filters from input, call db.listX), update, delete (resolve pid → id, call softDelete).
4. **API** — Handlers in `app/api/` parse input, call **svc** only, return JSON.
5. **Types** — Row and DTO types in `types/`; use in db and svc.

Never skip the svc layer (e.g. API → db directly). Never put business logic or pid generation in the DB layer.

## Quick reference

| Need | Where | Action |
|------|--------|--------|
| Run a query / CRUD | DB layer (`lib/db/`) | Add or use a function that performs the query and applies filters. |
| Filters / WHERE | DB layer | Accept a `filters` (or options) object; build WHERE and run query in the DB function. |
| Validation, pid, orchestration | Svc layer (`lib/svc/`) | Call DB functions; pass filters from request/input. |
| API handler | `app/api/` | Parse request → call **svc** → return response. No `lib/db/` imports. |
| Connection / driver | Neon + Vercel | Use `DATABASE_URL`; Neon serverless driver. See docs/DEPLOY-VERCEL.md. |

## Project docs

- **docs/DATABASE.md** — Full table convention, layers, and step-by-step.
- **docs/DESIGN.md** (§8) — List of tables and columns.
- **docs/STRUCTURE.md** — Folder layout (lib/db, lib/svc).
- **docs/DEPLOY-VERCEL.md** — Vercel + Neon env and deploy.

When working on DB, auth, or API that need data, follow this skill and **docs/DATABASE.md** so the codebase stays consistent and GORM-style (DB functions for CRUD + filters, svc on top).
