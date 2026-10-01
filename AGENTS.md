# Development previews

- For previews over Tailscale, create `.env.local` from `.env.example` if it
  does not already exist. Preserve any existing local environment settings.
- Set `DEV_ALLOWED_ORIGINS` to the preview host's comma-separated Tailscale IPs
  or hostnames, without a protocol or port.
- Keep machine-specific addresses in the Git-ignored `.env.local`, not in
  `next.config.ts` or other tracked files.
- Restart the dev server after changing the allowed origins and verify that
  the page's interactive controls work through the Tailscale preview URL.
