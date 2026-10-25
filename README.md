Certified Bad Example — Website package v18 (October 25, 2026)

Deploy the CONTENTS of this ZIP to the existing Cloudflare Pages project (site root).

Public website: https://certifiedbadexample.com/
www alias: https://www.certifiedbadexample.com/
Links hub: https://certifiedbadexample.com/links/

Public contact addresses:
  hello@certifiedbadexample.com — general podcast inquiries
  jameel@certifiedbadexample.com — Jameel
  august@certifiedbadexample.com — August

Incoming email routes through Cloudflare Email Routing to the existing Yahoo inbox.
Outbound correspondence uses the Yahoo account with its Reply-To set to hello@certifiedbadexample.com.
The Yahoo account address is intentionally not published on the website.

Changes from v17:
- Publish hello@certifiedbadexample.com as the general contact on site pages and the links hub.
- Update the public submissionEmail setting to hello@certifiedbadexample.com.
- Route form submission notifications to hello@certifiedbadexample.com via Cloudflare forwarding.
- Point links-hub official website reference to the custom domain.
- Preserve all existing page layouts, branding, navigation, and episode functions.

IMPORTANT: The guest/story forms still require Cloudflare Turnstile and Resend environment variables
(TURNSTILE_SECRET_KEY, RESEND_API_KEY, FROM_EMAIL). This package does not configure
those services or modify DNS or Yahoo settings.

Version 19: Added dedicated mailto contact buttons and visible email addresses on Jameel and August host pages.

Version 20: Redesigned homepage host-name links with dramatically contrasting italic serif first names and uppercase condensed sans-serif surnames, raised beveled button borders and accessible focus/hover/press states. Removed decorative icon between host links.


Version 21: Updated homepage hero banner with approved Japanese anime-style artwork. Both WebP and PNG source included. Updated homepage cache version. All other features preserved.
