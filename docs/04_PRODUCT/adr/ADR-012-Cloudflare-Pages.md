# ADR-012: Cloudflare Pages

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Deploy the static frontend to Cloudflare Pages.

## Context

The application needs globally distributed static hosting, straightforward GitHub integration, and a low operational burden.

## Alternatives considered

- Netlify
- Vercel
- Render
- GitHub Pages

## Consequences

Cloudflare Pages provides CDN-backed deployment and simple static-site delivery. Platform-specific configuration and runtime constraints must be considered for future backend features.

## Implementation notes

Build with Vite and publish the generated static output. Keep deployment settings documented alongside the hosting configuration.

## Related documents

- [ADR-002: Vite](ADR-002-Vite.md)

## Future review

Review if server-side rendering, regional data requirements, or backend hosting needs change.
