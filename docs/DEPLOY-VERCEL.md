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

3. **Environment variables**  
   Add in **Settings → Environment Variables**:
   - `TELEGRAM_BOT_TOKEN` — Telegram bot token (for admission enquiry notifications)
   - `TELEGRAM_CHAT_ID` — Telegram chat id where alerts should be sent

   For auth later (Phase 3), also add:
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
- [ ] `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` added for notifications  
- [ ] (Later) `NEXTAUTH_SECRET` and `NEXTAUTH_URL` set when auth is added  
- [ ] (Optional) Custom domain configured  
