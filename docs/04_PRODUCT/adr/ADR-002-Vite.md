# ADR-002: Vite

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Use Vite as the development server and production build tool.

## Context

The application requires fast local feedback, first-class TypeScript support, and a static production build compatible with Cloudflare Pages.

## Alternatives considered

- Webpack
- Parcel
- Next.js

## Consequences

Vite improves startup and hot-update speed while keeping the build configuration small. Server-side rendering is not supplied by this decision.

## Implementation notes

Keep Vite configuration focused on build and development concerns; application routing and architecture remain independent of the bundler.

## Related documents

- [ADR-001: React and TypeScript](ADR-001-React-TypeScript.md)
- [ADR-012: Cloudflare Pages](ADR-012-Cloudflare-Pages.md)

## Future review

Review if server rendering or a different deployment model becomes a requirement.
