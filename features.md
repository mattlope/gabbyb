# Feature Roadmap

> Working feature list for the Gabby B website. Check items off as completed, add new ideas as they come up.

---

## Completed (v2.1)

- [x] Extract CSS into `css/styles.css`
- [x] Extract JS into `js/main.js`
- [x] Extract base64 images into `images/` directory
- [x] Create dedicated pages for each nav item (music, about, videos, merch, booking)
- [x] Fix hero section for mobile devices
- [x] Fix Spotify embed sizing (380px album, 152px tracks)
- [x] Add music videos section with video link cards
- [x] Active nav state highlighting on subpages
- [x] Create `claude.md` project documentation
- [x] Create `changes.md` changelog

---

## High Priority — Engagement & Conversions

- [ ] **Mailing list / newsletter signup** — Email capture section (Mailchimp or ConvertKit embed). "Join the Family" CTA between sections or as a sticky banner. This is the #1 tool for fan retention.
- [ ] **Featured product spotlight** — Bring back the autographed XOXO CD as a hero product with large imagery and prominent CTA. Rotate featured items seasonally.
- [ ] **Tour dates / events section** — "Upcoming Shows" with date, venue, city, and ticket link. Can integrate Bandsintown or Songkick widget. Show "Follow for updates" when no dates are scheduled.
- [ ] **Press / EPK page (on-site)** — Build a self-contained electronic press kit instead of linking externally. Include: downloadable hi-res photos, short & long bio, press quotes, achievements, contact info.
- [ ] **Bundinha / Funklandia EP teaser** — "Coming Soon" section with artwork preview, pre-save link, and optional countdown timer. Build hype for the new release.

---

## Medium Priority — UX & Polish

- [ ] **Open Graph & Twitter Card meta tags** — Social sharing previews (image, title, description) for every page. Huge for virality when fans share links.
- [ ] **Favicon** — Add a branded favicon (kiss mark or logo). Currently shows browser default.
- [ ] **Custom 404 page** — Branded "page not found" with navigation back to home. On-brand with the pink/gold theme.
- [ ] **Back-to-top button** — Floating button that appears after scrolling down on the long index page.
- [ ] **Page transition animations** — Smooth fade or slide between subpages to feel like a single-page app.
- [ ] **Lazy loading for merch images** — Add `loading="lazy"` and shimmer placeholders for merch product images (loaded from gabbybmusic.com).
- [ ] **Lyrics page** — Song lyrics for each track, either on the music page or as a dedicated section. Great for SEO and fan engagement.

---

## Quick Wins — Low Effort, High Value

- [ ] **sitemap.xml + robots.txt** — Basic SEO files so search engines discover and crawl all pages.
- [ ] **JSON-LD structured data** — MusicGroup schema markup for Google rich results (artist info, albums, social links).
- [ ] **Preload critical assets** — `<link rel="preload">` for hero image, fonts, and logo to speed up first paint.
- [ ] **Accessibility audit** — Skip-to-content link, ARIA labels on social icons, keyboard focus states, alt text review.
- [ ] **Dynamic copyright year** — Replace hardcoded "2025" in footer with JS `new Date().getFullYear()`.

---

## Future Ideas / Wishlist

- [ ] **Photo gallery** — Press photos and behind-the-scenes images in a lightbox grid
- [ ] **Fan content / UGC section** — Embedded TikToks or Instagram posts from fans using a hashtag
- [ ] **Dark mode toggle** — Optional dark theme switcher
- [ ] **Parallax scrolling effects** — Subtle depth on hero and section backgrounds
- [ ] **Contact form** — On-site booking form instead of linking externally
- [ ] **Multi-language support** — Toggle between English, Portuguese, Spanish, French (matches Gabby's multilingual brand)
- [ ] **Service worker / offline support** — Cache key pages for offline viewing
- [ ] **Analytics integration** — Placeholder for Google Analytics or Plausible
- [ ] **Loading screen animation** — Branded splash screen while assets load
- [ ] **Animated text effects** — Typewriter or reveal effects on section titles

---

## How to Use This File

1. Pick a feature from the list above
2. Move it to "in progress" by noting it here or in the chat
3. Implement, test, and commit
4. Check the box `[x]` and log the change in `changes.md`
5. Add new ideas anytime — just append to the relevant section
