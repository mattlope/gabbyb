# Changelog

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
