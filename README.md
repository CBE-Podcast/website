# V06 — Certified Bad Example

Upload the **contents** of this ZIP to the root of `CBE-Podcast/website` on GitHub. Cloudflare Pages should deploy automatically.

## V06 changes
- Official brand icons for YouTube, Apple Podcasts, Spotify, Instagram on homepage and above footer on **every** page.
- YouTube channel corrected to `@CertifiedBadExample_Podcast`. `functions/api/latest.js` fetches its most recent published YouTube RSS video and embeds it on the homepage. Falls back to a channel link if YouTube blocks retrieval.
- Episodes load from the public Captivate RSS feed via `functions/api/episodes.js`, including available artwork, titles, descriptions and links; season selector defaults to most recently published season, episode carousel animates and pauses on hover. Fallback points to Captivate if RSS retrieval fails.
- Host and Episodes navigation dropdowns, closed on scroll, outside click, Escape or selection; mobile friendly.
- Meet the Voices names use consistent typography and subtle multicolored queer-themed stars in place of arrows.
- Captivate-only donations. Submission email: `cbe_podcast@yahoo.com`.

## Important
The two `/api` endpoints require **Cloudflare Pages Functions**, not plain static hosting. Deploy the entire `functions/` folder alongside the site files. The YouTube and Captivate endpoints depend on third-party HTML/RSS accessibility; if those providers change or block access, the site displays safe links instead of fabricated content.

The submission form still opens a prepared email in the visitor’s email app; visitors must send it. No server-side email submission is configured.
