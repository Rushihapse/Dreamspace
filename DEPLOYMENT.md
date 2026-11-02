# Dreamspace production deployment

This package is ready for deployment on Vercel as a Vite project.

## Build settings

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Required environment variables

Add these in Vercel under **Project Settings → Environment Variables** before the production deployment:

- `RESEND_API_KEY` — required for contact-form email delivery
- `CONTACT_TO_EMAIL` — recommended value: `office@dreamspaceinfra.com`
- `CONTACT_FROM_EMAIL` — use a sender verified in your Resend account

The example values and expected names are also listed in `.env.example`.

## Domain

After the deployment succeeds, connect `dreamspaceinfra.com` and `www.dreamspaceinfra.com` in Vercel's domain settings. Use the DNS records shown by Vercel for the domain provider.

## Final checks completed

- Production build passed
- Phone, tablet and desktop layouts passed
- Major static and dynamic routes passed
- Contact API validation passed
- Sitemap coverage passed
- SEO metadata and canonical links passed
- Local media and video checks passed
- No console warnings or errors were found
