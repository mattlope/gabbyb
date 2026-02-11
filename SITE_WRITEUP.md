# Gabby B — Artist Platform Overview

## What It Is

A custom-built artist website and management dashboard for **Gabby B**, a Brazilian pop artist with 5M+ followers based in Miami. Two systems working together: a public-facing site that drives fans, press, and brands to take action — and a private backend dashboard that captures and manages every lead that comes in.

**Live at:** gabbybmusic.com | dash.gabbybmusic.com

---

## The Public Site

### First Impressions That Convert

The landing page opens with an animated video portal — a glowing, pulsing circle playing hero footage — framed by a hot pink-and-gold aesthetic that matches the artist's brand down to the pixel. Custom cursor (kiss emoji), falling gold sparkle particles, and scroll-reveal animations give the site a premium, editorial feel without relying on any heavy frameworks.

A scrolling marquee banner announces the XOXO EP, leading visitors directly into embedded Spotify players, Apple Music links, and the full 5-track listing. Everything is one click from a stream.

### Purpose-Built Pages

- **Music** — Full EP breakdown with individual Spotify track embeds in a 2-column grid. Every song is playable without leaving the site.
- **Videos** — 9 music video cards with YouTube integration. Hover-to-play overlays on desktop, tap-friendly on mobile.
- **Merch** — Live Shopify integration pulling the XOXO Collection and accessories. Fans buy without friction.
- **About** — Artist bio with follower count badges and location tags. Tells the story for press, brands, and new fans.
- **Booking** — The money page. A structured inquiry form that feeds directly into the backend dashboard.

### Booking Form That Actually Works

The booking page isn't a mailto link or a Google Form. It's a validated, rate-limited submission system with inquiry types (Festival/Concert, Private Event, Brand Partnership, Media/Press) that posts directly to the dashboard API. Clients fill it out, the team sees it instantly.

---

## The Backend Dashboard

### Secure Login

The dashboard sits behind a proper authentication wall — bcrypt password hashing (12-round salt), JWT session tokens, and a 5-attempt lockout with 15-minute cooldown. This isn't a WordPress plugin. It's purpose-built security.

### Submission Management

Every booking inquiry lands in a real-time feed with:

- **Search** across name, email, and message content
- **Filter** by status (New, Contacted, In Progress, Won, Lost) and read/unread state
- **Status workflow** — move leads through a pipeline from first contact to closed deal
- **Detail modal** — full submission view with one-click status updates
- **Pagination** — handles volume without slowing down

### Overview Dashboard

At a glance: total submissions, unread count, this week's activity, this month's activity. A recent submissions table shows the latest 5 inquiries with read status indicators. The team knows exactly where things stand the moment they log in.

### What's Coming

The dashboard roadmap is built into the UI as visible placeholders — showing the team and stakeholders what's next:

| Phase | Feature | What It Unlocks |
|-------|---------|-----------------|
| 3 | **Streaming Analytics** | Spotify, Apple Music, YouTube Music & Deezer numbers in one place |
| 4 | **Social Media Analytics** | Instagram, TikTok, YouTube growth and engagement metrics |
| 5 | **Fan Demographics** | Listener age, gender, and geographic heat maps |
| 5 | **Revenue & Royalties** | Earnings by platform, royalty tracking, split management |
| 6 | **Tour & Events** | Shows, ticket sales, geographic demand via Bandsintown |
| 6 | **Release Planner** | Singles/albums calendar, pre-save campaigns, rollout strategy |
| 7 | **Ad Performance** | Meta Ads and Google Ads with ROI tracking |
| 7 | **Smart Links & Campaigns** | Linkfire/Odesli click-through and campaign analytics |

---

## Technical Selling Points

### Zero Framework Overhead

The public site is pure HTML, CSS, and JavaScript. No React, no Next.js, no build step. Pages load fast, rank well, and don't break when dependencies update. The dashboard backend runs on Node.js + Express — battle-tested, lightweight, and easy to deploy.

### Real Database, Not a Spreadsheet

Submissions are stored in SQLite with indexed columns for fast queries. Parameterized queries prevent SQL injection. The database is embedded (sql.js) so there's no external database server to manage or pay for.

### Security Built In, Not Bolted On

- **Helmet.js** security headers (CSP, HSTS, X-Frame-Options)
- **CORS whitelist** — only the live domain can hit the API
- **Rate limiting** on every endpoint (login, submissions, general API)
- **Input validation** with length limits and sanitization
- **Timing-attack prevention** on failed logins

### Mobile-First Responsive Design

Every page adapts from phone to desktop. The dashboard sidebar collapses to a hamburger menu. Grids reflow from 4 columns to 1. The booking form is thumb-friendly. Viewport-fit covers notched devices.

### Artist-Grade Visual Design

The entire site is designed around Gabby B's brand identity:

- **Hot pink to deep pink gradients** across buttons, accents, and hover states
- **Playfair Display** serif headings for editorial elegance
- **Outfit** sans-serif body text for modern readability
- **Gold sparkle particle system** as ambient background animation
- **Glassmorphism** login card with frosted backdrop blur

---

## Who This Is For

- **The Artist** — a professional home base that's more than a Linktree
- **Management** — a CRM-lite dashboard that captures and tracks every business inquiry
- **Brands & Promoters** — a clear, structured way to submit booking requests
- **Press** — quick access to bio, stats, videos, and contact
- **Fans** — stream music, watch videos, buy merch, all in one place

---

## By The Numbers

- **6 public pages** + login + dashboard
- **7 API endpoints** with full CRUD operations
- **5-stage lead pipeline** (New > Contacted > In Progress > Won/Lost)
- **8 planned feature expansions** across 5 phases
- **0 external dependencies** on the public site (no jQuery, no Bootstrap, no frameworks)
- **Sub-second page loads** with lazy-loaded images and no build step

---

*v3.0-beta — February 2026*
