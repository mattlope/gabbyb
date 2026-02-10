# CLAUDE.md — Gabby B Website

## Start of Session Checklist

1. Read `features.md` — the working feature roadmap with checkboxes
2. Read `changes.md` — the changelog to know what's already been done
3. Check `git status` and `git log --oneline -5` to see current state
4. Ask the user what they want to work on, or suggest items from `features.md`

## Project Summary

Official website for **Gabby B** — Brazilian pop artist based in Miami, FL with 5M+ followers. The site promotes her music (XOXO EP), merch (Shopify), music videos (YouTube), and booking inquiries.

**Current version: v2.1**

## Tech Stack & Constraints

- **Static HTML/CSS/JS only** — no build tools, no frameworks, no bundlers
- Google Fonts (Playfair Display, Outfit, Dancing Script)
- Spotify embed iframes for streaming
- External Shopify merch store (daniel-muybuenollc.myshopify.com)
- Hosted on Cloudflare (email protection active)
- All paths are relative — no absolute URLs for local assets

## File Structure

```
index.html              Main landing page (all sections combined)
css/styles.css          All styles — design system, components, responsive
js/main.js              Nav scroll, hamburger, sparkles, scroll reveal
images/                 logo.webp, hero-bg.webp, xoxo-ep.jpg, about.webp
pages/                  music.html, about.html, videos.html, merch.html, booking.html
claude.md               This file — session instructions
features.md             Feature roadmap with checkboxes
changes.md              Version changelog
```

## Key Files to Know

| File | What it does | When to edit |
|------|-------------|--------------|
| `css/styles.css` | All styles, design tokens, responsive breakpoints | Any visual change |
| `js/main.js` | Nav, mobile menu, sparkles, scroll reveal, smooth scroll | Any behavior change |
| `index.html` | Full landing page with all sections | Content or layout changes |
| `pages/*.html` | Dedicated pages — each has its own nav, header, content, footer | Page-specific changes |

## Design System

- Primary: `#FF1493` (Hot Pink) — buttons, accents, highlights
- Secondary: `#C71585` (Deep Pink) — hover states, gradients
- Gold: `#FFD700` — accent badges, special highlights
- Background: `#FFF5F8` (Pink Cream)
- Dark: `#1a1a1a` — EP section, booking section, footer
- Headings: Playfair Display (serif, italic, 900 weight)
- Body: Outfit (sans-serif)
- Decorative: Dancing Script (cursive)

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
- Booking: `https://gabbybmusic.com/booking/`
- Press: `https://gabbybmusic.com/press/`
