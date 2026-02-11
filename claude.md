# CLAUDE.md — Gabby B Website

## Start of Session Checklist

1. Read `features.md` — the working feature roadmap with checkboxes
2. Read `DASHBOARD.md` — the dashboard feature roadmap with phases
3. Read `changes.md` — the changelog to know what's already been done
4. Check `git status` and `git log --oneline -5` to see current state
5. Ask the user what they want to work on, or suggest items from `features.md` or `DASHBOARD.md`

## Project Summary

Official website for **Gabby B** — Brazilian pop artist based in Miami, FL with 5M+ followers. The site promotes her music (XOXO EP), merch (Shopify), music videos (YouTube), and booking inquiries.

**Current version: v3.0-beta**

## Tech Stack & Constraints

### Main Site
- **Static HTML/CSS/JS only** — no build tools, no frameworks, no bundlers
- Google Fonts (Playfair Display, Outfit, Dancing Script)
- Spotify embed iframes for streaming
- External Shopify merch store (daniel-muybuenollc.myshopify.com)
- Hosted on Cloudflare (email protection active)
- All paths are relative — no absolute URLs for local assets

### Dashboard (dash.gabbybmusic.com)
- **Node.js + Express** backend with SQLite database
- JWT authentication with bcrypt password hashing
- Rate limiting (login, API, form submissions)
- Security headers via Helmet
- See `DASHBOARD.md` for full feature roadmap

## File Structure

```
index.html              Main landing page (all sections combined)
css/styles.css          All styles — design system, components, responsive
js/main.js              Nav scroll, hamburger, sparkles, scroll reveal
js/booking-form.js      Booking form submission handler
images/                 logo.webp, hero-bg.webp, xoxo-ep.jpg, about.webp
videos/                 hero.mp4 (hero background/portal video)
pages/                  music.html, about.html, videos.html, merch.html, booking.html
dashboard/              Backend dashboard app (dash.gabbybmusic.com)
  server.js             Express server entry point
  db/database.js        SQLite database setup and schema
  routes/auth.js        Login/auth API routes
  routes/api.js         Submissions and stats API routes
  middleware/auth.js     JWT auth middleware
  scripts/create-admin.js   CLI tool to create admin users
  public/               Dashboard frontend (login + dashboard UI)
  .env.example          Environment variables template
claude.md               This file — session instructions
features.md             Feature roadmap with checkboxes
changes.md              Version changelog
DASHBOARD.md            Dashboard feature roadmap and phases
```

## Key Files to Know

| File | What it does | When to edit |
|------|-------------|--------------|
| `css/styles.css` | All styles, design tokens, responsive breakpoints | Any visual change |
| `js/main.js` | Nav, mobile menu, sparkles, scroll reveal, smooth scroll | Any behavior change |
| `js/booking-form.js` | Booking form → dashboard API submission | Form changes |
| `index.html` | Full landing page with all sections | Content or layout changes |
| `pages/*.html` | Dedicated pages — each has its own nav, header, content, footer | Page-specific changes |
| `dashboard/server.js` | Dashboard Express server | Backend changes |
| `dashboard/routes/api.js` | Submissions CRUD + stats endpoints | API changes |
| `dashboard/public/` | Dashboard frontend (login, dashboard views) | Dashboard UI changes |
| `DASHBOARD.md` | Dashboard feature roadmap with phases | Dashboard planning |

## Design System

- Primary: `#FF1493` (Hot Pink) — buttons, accents, highlights
- Secondary: `#C71585` (Deep Pink) — hover states, gradients
- Gold: `#FFD700` — accent badges, special highlights
- Background: `#FFF5F8` (Pink Cream)
- Dark: `#1a1a1a` — EP section, booking section, footer
- Headings: Playfair Display (serif, italic, 900 weight)
- Body: Outfit (sans-serif)
- Decorative: Dancing Script (cursive)

## Key Layout Patterns

- **Hero section** uses `.hero-inner` flex wrapper (max-width: 1000px) containing `.hero-content` (left) and `.hero-video` (right, circular portal). On mobile (≤600px), `.hero-inner` becomes `position: static` so the video escapes to a full-background absolute element behind the gradient.
- **EP section** uses `.ep-inner` CSS grid (2-column on desktop, 1-column on mobile) with `.ep-artwork` and `.ep-info`.

## Conventions

- **Subpages** link CSS/JS with `../css/styles.css` and `../js/main.js`
- **Subpage nav** starts with class `scrolled` (solid background, no transparency)
- **Active nav link** gets class `active` on the current page
- **Reveal animations** use class `reveal` — JS adds `visible` on scroll via IntersectionObserver
- **Emoji usage** — only in content where the original site had them, not in code/comments
- All images use `loading="lazy"` where appropriate
- Merch images load from `gabbybmusic.com/wp-content/uploads/`

## Workflow

1. Always work on a `claude/` prefixed branch
2. After implementing a feature, check the box in `features.md`
3. Log the change in `changes.md` under the current version
4. Commit with a clear message describing what changed and why
5. Push to the feature branch when work is complete

## External Links Reference

- Spotify artist: `https://open.spotify.com/artist/6Yb4hxEBpRMWgh7YzHbKbn`
- YouTube: `https://www.youtube.com/@GabbyBMusic`
- TikTok: `https://www.tiktok.com/@gabbybmusic`
- Instagram: `https://www.instagram.com/gabbybmusic/`
- Apple Music: `https://music.apple.com/us/artist/gabby-b/1456176973`
- Socials hub: `https://socials.gabbybmusic.com/`
- Shopify store: `https://daniel-muybuenollc.myshopify.com/`
- Dashboard: `https://dash.gabbybmusic.com/`
- Booking: `https://gabbybmusic.com/booking/`
- Press: `https://gabbybmusic.com/press/`
