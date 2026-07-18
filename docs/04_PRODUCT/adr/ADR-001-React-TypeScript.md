# ADR-001: React and TypeScript

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Use React with TypeScript for the Hunter System frontend.

## Context

Hunter System needs a maintainable, component-oriented interface with reliable tooling and safe evolution as features grow.

## Alternatives considered

- Vue
- Angular
- Svelte
- Solid

## Consequences

React provides a mature ecosystem and reusable composition model. TypeScript makes module contracts and refactors safer. The project accepts React's runtime and dependency overhead in exchange for those benefits.

## Implementation notes

Use typed components, hooks, and domain contracts. Keep business logic outside presentation components where practical.

## Related documents

- [ADR-002: Vite](ADR-002-Vite.md)
- [ADR-008: Feature-first Module Architecture](ADR-008-Module-Architecture.md)

## Future review

Review when frontend requirements no longer suit a component-based single-page application.
