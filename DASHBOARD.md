# Dashboard — dash.gabbybmusic.com

> Backend management dashboard for the Gabby B website. Tracks form submissions, ad performance, social media growth, and more.

**Status:** Beta (v3.0-beta)
**Subdomain:** `dash.gabbybmusic.com`
**Stack:** Node.js, Express, SQLite, JWT Auth

---

## Current (v3.0-beta)

- [x] Secure login system (bcrypt + JWT + rate limiting)
- [x] Booking/contact form on the main site
- [x] Form submissions tracking (name, email, type, message, date)
- [x] Dashboard view for all submissions (table with search/filter)
- [x] Submission detail view
- [x] Mark submissions as read/unread
- [x] CSRF protection, security headers (Helmet)
- [x] Admin user management (CLI-based)

---

## Phase 2 — CRM & Lead Management

- [ ] **Submission status workflow** — New > Contacted > In Progress > Closed/Won > Closed/Lost
- [ ] **Notes on submissions** — Add internal notes/comments to each inquiry
- [ ] **Email notifications** — Send email alert when new form is submitted
- [ ] **Export to CSV** — Download all submissions as CSV for external use
- [ ] **Submission analytics** — Charts showing submissions over time (daily/weekly/monthly)
- [ ] **Tagging system** — Tag submissions (VIP, festival, brand, etc.)

---

## Phase 3 — Advertising Integrations

- [ ] **Facebook/Meta Ads** — Connect Meta Business API, show ad spend, reach, CPM, conversions
- [ ] **Google Ads** — Connect Google Ads API, show campaign performance, cost per lead
- [ ] **Ad dashboard** — Unified view of all ad platforms with spend vs. leads analysis
- [ ] **UTM tracking** — Track which ads/campaigns drive form submissions
- [ ] **ROI calculator** — Compare ad spend to booking revenue

---

## Phase 4 — Social Media Analytics

- [ ] **Instagram growth** — Follower count, engagement rate, top posts, growth charts
- [ ] **TikTok analytics** — Views, followers, trending videos, growth over time
- [ ] **YouTube analytics** — Subscribers, views, watch time, top videos
- [ ] **Spotify analytics** — Monthly listeners, streams, playlist adds, top cities
- [ ] **Cross-platform dashboard** — Unified social media overview with comparison charts
- [ ] **Content calendar** — Plan and schedule posts across platforms
- [ ] **Engagement tracker** — Track comments, shares, saves across all platforms

---

## Phase 5 — Fan Engagement & Mailing

- [ ] **Mailing list management** — Subscribers from site signup, import/export
- [ ] **Email campaigns** — Send newsletters and announcements
- [ ] **Fan database** — Unified database of fans from all touchpoints
- [ ] **Fan segments** — Group fans by engagement level, location, platform
- [ ] **Event RSVPs** — Track RSVPs for shows and events

---

## Phase 6 — Advanced Features

- [ ] **Multi-user access** — Manager, agent, and team member accounts with role-based permissions
- [ ] **Activity log** — Track who did what and when
- [ ] **Two-factor authentication** — TOTP-based 2FA for all accounts
- [ ] **Mobile-responsive dashboard** — Full dashboard experience on phones/tablets
- [ ] **Dark mode** — Toggle between light and dark dashboard themes
- [ ] **Webhook integrations** — Push data to Zapier, Make, or custom endpoints
- [ ] **API access** — RESTful API for custom integrations
- [ ] **White-label option** — Rebrandable dashboard for management/label use

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Server | Node.js + Express | API and page serving |
| Database | SQLite (better-sqlite3) | Local, zero-config, fast |
| Auth | bcryptjs + jsonwebtoken | Password hashing + session tokens |
| Security | Helmet + express-rate-limit + CORS | Headers, brute-force protection, origin control |
| Frontend | Vanilla HTML/CSS/JS | No framework needed for dashboard UI |
| Hosting | Cloudflare (subdomain) | `dash.gabbybmusic.com` |

---

## How to Run Locally

```bash
cd dashboard
npm install
cp .env.example .env        # Edit with your own secrets
node scripts/create-admin.js # Create your first admin user
node server.js               # Starts on http://localhost:3000
```
