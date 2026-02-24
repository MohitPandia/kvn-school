# Deploy KVN Sec School on Vercel

Get the KVN Sec School website running on Vercel.

## Prerequisites

- [Vercel](https://vercel.com) account (GitHub login is easiest)
- Code pushed to a Git repo (GitHub, GitLab, or Bitbucket)

---

## Steps

1. **Push code to Git**  
   Commit and push your project to GitHub (or your chosen provider).

2. **Import on Vercel**  
   - Go to [vercel.com](https://vercel.com) → **Add New…** → **Project**.  
   - Import the repository.  
   - **Framework Preset:** Next.js (auto-detected).  
   - **Root Directory:** leave blank.  
   - **Build Command:** `next build` (default).  
   - **Install Command:** `pnpm install` (Vercel will detect `pnpm-lock.yaml`).

3. **Environment variables (Phase 1)**  
   For the static/public site only, **no env vars are required**.  
   When you add auth (Phase 3), add in **Settings → Environment Variables**:
   - `NEXTAUTH_SECRET` — long random string (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` — your production URL (e.g. `https://kvn-school.vercel.app`)  
   If you add a database (e.g. Neon), add `DATABASE_URL` as well.

4. **Deploy**  
   Click **Deploy**. After the build finishes, open the provided URL.

5. **Custom domain (optional)**  
   In **Project → Settings → Domains**, add your domain and follow the DNS instructions. If you use auth, set `NEXTAUTH_URL` to that domain and redeploy.

---

## Summary checklist

- [ ] Repo pushed to GitHub/GitLab/Bitbucket  
- [ ] Vercel project created and repo connected  
- [ ] Deploy triggered and build succeeded  
- [ ] (Later) `NEXTAUTH_SECRET` and `NEXTAUTH_URL` set when auth is added  
- [ ] (Optional) Custom domain configured  
