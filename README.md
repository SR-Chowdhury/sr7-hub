# SR7 Hub — Frontend

Portfolio and content site for SR7 (Shihan Chowdhury) — web security writeups, HTB machines, VulnHub walkthroughs, WordPress audits, and Fiverr services. Includes an admin panel for managing all content.

**Live:** https://sr7-hub.vercel.app
**Admin:** https://sr7-hub.vercel.app/admin/login

## Stack

- **React 19** — UI
- **Vite** — build tool
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — styling
- **Fetch API** — HTTP requests

## Structure

```
src/
├── admin/            admin panel (protected routes)
├── assets/           images, icons
├── components/       reusable UI components
├── data/             legacy static data (kept for reference)
├── lib/              api.js, useResource.js — API client
├── pages/            public page components
├── utils/            helpers (search, etc.)
├── App.jsx           routes + layout
└── main.jsx          entry point
```

## Public Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/portswigger` | PortSwigger lab solutions |
| `/htb` | Hack The Box machines |
| `/vulnhub` | VulnHub walkthroughs |
| `/wordpress-audit` | WordPress audits |
| `/fiverr` | Fiverr services |

## Admin Routes (JWT required)

| Path | Purpose |
|---|---|
| `/admin/login` | Login |
| `/admin/labs` | Manage labs |
| `/admin/machines` | Manage HTB machines |
| `/admin/walkthroughs` | Manage VulnHub walkthroughs |
| `/admin/audits` | Manage WordPress audits |
| `/admin/gigs` | Manage Fiverr gigs |
| `/admin/profile` | Edit Fiverr profile |

## Environment Variables

```
VITE_API_URL=https://sr7-hub-backend.onrender.com/api
```

For local development, create `.env` with `VITE_API_URL=http://localhost:5000/api`.

> **Warning:** `VITE_*` variables are embedded in the browser bundle. Never put secrets here.

## Local Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Backend must be running on port 5000 for data to load.

## Deploy

Deployed on **Vercel**. Environment variable `VITE_API_URL` set in Vercel's project settings points at the Render backend.

`vercel.json` contains an SPA rewrite so direct URL access works (e.g. refreshing on `/admin/login`).
