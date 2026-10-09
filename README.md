# Certified Bad Example — V07

Upload the **contents** of this ZIP (not the enclosing V07_build folder) to the root of `CBE-Podcast/website` on GitHub. Deploy using **Cloudflare Pages with Functions enabled**.

## V07 changes
- Expanded home intro, centered hosts with a single larger pride-themed sparkle, refined episode carousel preserving full artwork.
- Latest video uses the YouTube Data API to select **only videos at least 10 minutes long**, skipping Shorts. Inline privacy-enhanced player plus separate YouTube pop-out and subscription links. The 10-minute threshold can exclude shorter legitimate episodes.
- Expanded host pages (August's award-winning voice acting emphasized; no Fathernetics references on Jameel's page).
- Submit dropdown: Submit a Story / Be a Guest. Both forms have appropriate fields, Instagram links, server-side Turnstile verification and direct email delivery.
- Dedicated branded Support page with external Captivate checkout only.
- Thank-you toast appears **only after the email service accepts the message**.

## REQUIRED deployment configuration (Cloudflare Pages > Settings > Variables and Secrets)
1. `TURNSTILE_SITE_KEY`: Cloudflare Turnstile **public** site key for your production domain.
2. `TURNSTILE_SECRET_KEY`: matching Turnstile **secret**, set as encrypted secret.
3. `RESEND_API_KEY`: email API key from Resend, set as encrypted secret.
4. `FROM_EMAIL`: sender address from a domain you own and have **verified with Resend** (e.g. `Certified Bad Example <submissions@yourdomain.example>`). The receiving address is `cbe_podcast@yahoo.com` and is set in `functions/api/submit.js`. **Do not set FROM_EMAIL to the Yahoo address unless you control and can verify that sending domain.**
5. `YOUTUBE_API_KEY`: Google YouTube Data API v3 key (set as secret). Without this, latest video falls back to a YouTube channel link rather than risking showing Shorts.

Set variables in production and preview as needed, then redeploy. Turnstile will not render or allow form submission until the site key is configured. Forms will return a clear configuration error until the secrets and verified sender are set. Rate limiting should additionally be enabled using Cloudflare WAF rules for `/api/submit` (the function already verifies CAPTCHA and has a honeypot).

**Notes:** The email provider accepting a message does not guarantee inbox placement. Captivate's external support URL should be checked against your account's live support settings. The YouTube API quota and duration threshold may need adjustment. No awards, credits, or other biographical claims beyond user-provided details were invented.
