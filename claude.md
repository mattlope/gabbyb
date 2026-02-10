# Gabby B — Official Website

## Project Overview

Official website for **Gabby B**, a Brazilian pop recording artist based in Miami, FL. The site promotes her music, brand, merchandise, and booking inquiries.

## Project Goals

- Serve as the primary web presence for Gabby B's brand
- Promote the **XOXO EP** and all music releases
- Showcase official music videos and streaming links
- Drive merchandise sales via Shopify integration
- Provide booking and press inquiry channels
- Maintain a cohesive visual identity (pink/gold theme)
- Ensure mobile-first responsive design

## Tech Stack

- **Static HTML/CSS/JS** — no build tools or frameworks
- **Google Fonts** — Playfair Display, Outfit, Dancing Script
- **Spotify Embeds** — album and track players
- **Shopify** — external merch store (daniel-muybuenollc.myshopify.com)
- **Cloudflare** — hosting/CDN with email protection

## Site Structure

```
gabbyb/
├── index.html          # Main landing page (all sections)
├── css/
│   └── styles.css      # All styles extracted from inline
├── js/
│   └── main.js         # Navigation, sparkles, scroll reveal
├── images/
│   ├── logo.webp       # Gabby B logo (nav + footer)
│   ├── hero-bg.webp    # Hero section background
│   ├── xoxo-ep.jpg     # XOXO EP artwork
│   └── about.webp      # About section photo
├── pages/
│   ├── music.html      # Music page — EP details + streaming
│   ├── about.html      # About page — bio + social links
│   ├── videos.html     # Videos page — music videos + streaming
│   ├── merch.html      # Merch page — full product catalog
│   └── booking.html    # Booking page — inquiry form + types
├── claude.md           # This file — project goals & structure
├── changes.md          # Version history and changelog
└── README.md           # Repository description
```

## Navigation Pages

| Nav Item | Target | Type |
|----------|--------|------|
| Music | `#music` / `pages/music.html` | Section / Page |
| About | `#about` / `pages/about.html` | Section / Page |
| Videos | `#videos` / `pages/videos.html` | Section / Page |
| Merch | `#merch` / `pages/merch.html` | Section / Page |
| Booking | `#booking` / `pages/booking.html` | Section / Page |
| Press | gabbybmusic.com/press/ | External |

## External Integrations

- **Spotify**: Artist profile + album/track embeds
- **YouTube**: @GabbyBMusic channel
- **TikTok**: @gabbybmusic
- **Instagram**: @gabbybmusic
- **Apple Music**: Artist profile
- **Shopify**: Merch store
- **Socials Hub**: socials.gabbybmusic.com

## Design System

- Primary: `#FF1493` (Hot Pink)
- Secondary: `#C71585` (Deep Pink)
- Accent: `#FFD700` (Gold)
- Background: `#FFF5F8` (Pink Cream)
- Dark: `#1a1a1a`
- Heading font: Playfair Display (serif)
- Body font: Outfit (sans-serif)
- Decorative: Dancing Script (cursive)

## Key Music Videos

- Si No Sabias
- Belly Dancer (1M+ views)
- Pretty Girl Lit ft. Justina Valentine
- Earthquake ft. Mikaila Murphy
- Fine ft. Devvon Terrell
- One Too Many
- Leche ft. Vikina
- Bundinha (2025)
- Wedding Guest (2025)

## Current Version

**v2.1** — See changes.md for details.

## Working Feature List

See **features.md** for the full roadmap, backlog, and checklist of upcoming work.
