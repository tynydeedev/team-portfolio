# Team Portfolio

React + TypeScript + Vite project, configured for Cloudflare Pages.

## Cloudflare Dashboard Deploy (Recommended)

1. Push this repository to GitHub.
2. In Cloudflare Dashboard, go to **Workers & Pages** → **Create** → **Pages**.
3. Choose **Connect to Git** and select this repository.
4. Use these build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: *(leave empty)*
5. In the same project, open **Settings** → **Environment variables** and add:
   - `VITE_DISCORD_WEBHOOK_URL` = your Discord webhook URL
6. Click **Save and Deploy**.

## Required Project Config (already included)

- `vite.config.ts` uses `base: '/'` for Cloudflare Pages.
- `public/_redirects` includes SPA fallback:

```txt
/* /index.html 200
```

- `wrangler.toml` includes:

```toml
pages_build_output_dir = "dist"
```

## Local Commands

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run cf:preview` — preview with Cloudflare Pages runtime

## Notes

- No GitHub Actions deploy pipeline is required.
- Deployments are handled directly by Cloudflare Pages via Git integration.
