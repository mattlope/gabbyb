# Changelog

## v3.0-beta — Backend Dashboard & Booking Form (2026-02-11)

### Backend Dashboard (dash.gabbybmusic.com)
- Created full Node.js + Express backend application in `dashboard/`
- SQLite database with `users` and `submissions` tables
- Secure authentication: bcrypt password hashing (12 rounds), JWT tokens, rate-limited login (5 attempts per 15 min)
- Security middleware: Helmet (CSP, HSTS, etc.), CORS whitelist, body size limits
- Admin user creation via CLI script (`node scripts/create-admin.js`)
- API endpoints for form submissions (CRUD), stats overview, auth
- Dashboard frontend with login page and main dashboard UI
- Overview section: stat cards (total, unread, this week, this month), recent submissions table
- Submissions section: full table with search, status filter, read/unread filter, pagination
- Submission detail modal with status management (New, Contacted, In Progress, Won, Lost)
- Mobile-responsive sidebar and layout
- Coming soon placeholders for Social Media and Ads sections
- Created `DASHBOARD.md` feature roadmap with 6 planned phases

### Booking Form
- Replaced external booking link with on-site inquiry form on `pages/booking.html`
- Form fields: name, email, inquiry type (dropdown), message
- Client-side validation with user-friendly error messages
- Submissions sent to dashboard API at `dash.gabbybmusic.com`
- Success/error feedback with visual indicators
- Added booking form styles to main stylesheet (glass-morphism inputs, custom select arrow, responsive 2-column layout)
- Updated homepage "Inquire Now" button to link to on-site booking page instead of external URL
- Created `js/booking-form.js` for form submission handling

### Documentation
- Updated `claude.md` with dashboard file structure, tech stack, and references
- Updated `features.md` with completed items
- Created `DASHBOARD.md` with full dashboard roadmap

---

## v2.2 — Hero Video & Polish (2026-02-11)

### Desktop Hero — Circular Video Portal
- Added `.hero-inner` flex wrapper with `max-width: 1000px` for a tight, centered layout
- Hero video plays inside a **450px glowing circle** next to the left-aligned title
- Portal entrance animation: scale + blur fade-in (0.6s delay)
- Pulsing pink/purple glow cycles on border and shadow (`portal-glow` keyframes)
- Tablet (≤900px): portal shrinks to 300px, gap tightens to 32px
- Mobile (≤600px): `.hero-inner` becomes `static`, video reverts to full-background fade

### Mobile Hero — Video Background
- Hero video plays as a faded full-screen background (40% opacity) on mobile
- Heavy gradient overlays for text readability
- Mobile hero shortened to 60svh with bottom-aligned content

### Album Art Cleanup
- Removed hover rotate/scale effect on EP artwork image
- Removed bouncing rotation animation on the "NEW" badge
- Pinned NEW badge inside the top-right corner of the album art (was floating outside)
- Constrained `.ep-artwork` container to `max-width: 420px` so badge aligns to image edge

### Bug Fixes
- Fixed Videos nav link (`#videos`) not matching section id (`music-videos`)
- Fixed mobile hero content rendering behind gradient overlay (restored `z-index: 2` on `.hero-content`)

---

## v2.1 — Site Structure Refactor (2026-02-10)

### Structural Changes
- **Extracted CSS** into `css/styles.css` — removed all inline styles from index.html
- **Extracted JavaScript** into `js/main.js` — removed inline scripts from index.html
- **Extracted images** into `images/` directory — replaced base64-encoded inline images with external files (logo.webp, hero-bg.webp, xoxo-ep.jpg, about.webp)
- **Created dedicated pages** for each navigation item:
  - `pages/music.html` — XOXO EP details, tracklist, and Spotify streaming embeds
  - `pages/about.html` — Artist bio, stats, and social media links
  - `pages/videos.html` — Music video catalog and streaming section
  - `pages/merch.html` — Full merchandise catalog (XOXO Collection + Accessories)
  - `pages/booking.html` — Booking types and inquiry information

### Mobile Hero Fix
- Fixed hero section for mobile devices using `100svh` and `-webkit-fill-available`
- Improved hero content padding and font sizing on small screens (< 600px and < 400px)
- Better background positioning on mobile (`center center`)
- Scaled down hero badge for smaller viewports

### Spotify Embed Improvements
- Replaced cramped 16:9 video cards with proper Spotify embed layout
- Album embed now displays at full 380px height
- Individual track embeds at 152px height in a 2-column grid
- Responsive — stacks to single column on mobile

### Music Videos Section
- Added new music video link cards section with the following videos from gabbybmusic.com:
  - Si No Sabias
  - Belly Dancer (1M+ views)
  - Pretty Girl Lit ft. Justina Valentine
  - Earthquake ft. Mikaila Murphy
  - Fine ft. Devvon Terrell
  - One Too Many
  - Leche ft. Vikina
  - Bundinha (2025)
  - Wedding Guest (2025)
- Video cards link to Gabby B's YouTube channel
- Play overlay animation on hover
- "Watch All Videos on YouTube" CTA button

### Navigation Updates
- Subpages have active state highlighting for current page
- Subpage nav starts in scrolled (solid background) state
- Page header component for subpages with gradient background

### Project Documentation
- Created `claude.md` — project goals, structure, design system, and integrations
- Created `changes.md` — this changelog

---

## v2.0 — Initial Site

- Single-page site with all HTML, CSS, JS, and images inline in index.html
- Hero section with animated sparkles and badge
- XOXO EP section with tracklist
- About section with bio and stats
- Spotify streaming embeds
- Social media links section
- Merch section with Shopify integration
- Booking section with inquiry types
- Mobile hamburger menu
- Scroll reveal animations
- Custom cursor (kiss/sparkle emojis)
