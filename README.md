# Certified Bad Example — V12

Updated hero backdrop: softly blended neutral grey area centered between hosts, obscuring prior logo artifacts. The independent original seal remains the sole rotating logo, sized at 27% of hero width, centered at 50% horizontal and 43% vertical, rotating every 12 seconds. Background URL cache-busted.

Deploy the ZIP contents at repository root; replace older files.

V10 — Hero logo sizing and replacement fix

The original logo is used once as an independently rotating layer over the logo-free hero-background.png. The static hero-banner.png is retained only as an unused source asset; it is NOT rendered on the homepage. CSS now explicitly overrides the general hero image width rule, preventing the seal from expanding to full-screen width.

# Certified Bad Example — V08

Deploy the **contents of this ZIP** at the root of `CBE-Podcast/website` (not an enclosing folder). Cloudflare Pages Functions require Git-based deployment or another method that deploys the `functions/` directory. Remove old `guest.html`, `submit.html`, and `functions/api/submit.js` from the repository if uploading files individually: they are intentionally excluded from V08.

## Changes
- All story and guest forms removed, including navigation links, home submission panel, and submission endpoint. No email or CAPTCHA setup needed.
- Home headline remains on one line using responsive font scaling.
- Host names use separate first-name serif and last-name sans-serif styles; each name spins exactly twice on hover/focus (honors reduced-motion settings).
- Single centered support panel.
- Episode archive remains visible with cached episodes (browser localStorage + Cloudflare edge cache), static horizontal scrolling and navigation arrows. No fallback message. Artwork is not cropped.
- Latest video is restricted to **public, embeddable, published videos at least 10 minutes long** from the official YouTube uploads playlist. Excludes Shorts and live streams; 10-minute threshold may exclude shorter legitimate long-form episodes. Server and browser caches retain last verified results. When none is known, show the branded placeholder.

## Cloudflare settings
Set `YOUTUBE_API_KEY` as a secret under Pages > Settings > Variables and Secrets; redeploy. Optionally set `YOUTUBE_CHANNEL_ID` to the official channel's UC... ID for more reliable lookups (otherwise the function tries to discover it). A YouTube API key is needed for automatic selection. Without it the placeholder remains unless you set `latestYouTubeVideoId` in `site-config.js` to a **verified public long-form episode**. Never put API secrets into `site-config.js`.

The channel's latest public uploads are inspected, rather than unpublished or scheduled videos. YouTube API limits and browser embed policies may still prevent playback for some viewers.

No Resend key, sender domain, form recipient, or Turnstile setup is required for V08.


V09 changes: standalone rotating original CBE logo on homepage (background seal covered), Hollywood-style host typography and passing shimmer, compact one-line season announcement, responsive one-line host taglines, and cross-links between host profiles. Respect reduced-motion settings. No forms.


V11: Replaced the baked-in stationary logo remnants in the hero background with a clean dark textured wall. The original independent logo layer continues rotating. Cache-busted hero background reference.
