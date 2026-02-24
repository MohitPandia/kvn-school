# Guide: Run KVN Sec School site locally

## Prerequisites

- **Node.js** 20+ or 22+ (see `package.json` engines if set)
- **Yarn** (or `corepack enable` then use yarn), or npm

---

## Quick start (first time)

From the project root:

```bash
# 1. Install dependencies
yarn install

# 2. Start the dev server
yarn dev
```

Open **http://localhost:3000**. For Phase 1 (no database), no `.env` is required.

---

## When auth is added (Phase 3)

Create a **`.env`** or **`.env.local`** in the project root:

```env
NEXTAUTH_SECRET=your-long-random-string-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000
```

If you add a database (e.g. Neon):

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Copy from `.env.example` if the project provides one.

---

## Useful commands

| Command       | Description              |
|---------------|--------------------------|
| `yarn dev`    | Start Next.js dev server |
| `yarn build`  | Production build         |
| `yarn start`  | Run production server    |
| `yarn lint`   | Run ESLint               |

---

## Project docs

- **DESIGN.md** — Vision, roles, screens, tech stack
- **STRUCTURE.md** — Codebase layout and where to add features
- **PROJECT-PLAN.md** — Phases, milestones, and step-by-step tasks
- **DEPLOY-VERCEL.md** — (When added) Deploy to Vercel
