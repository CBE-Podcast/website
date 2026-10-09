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
