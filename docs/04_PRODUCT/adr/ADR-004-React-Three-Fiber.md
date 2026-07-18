# ADR-004: React Three Fiber

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Use React Three Fiber rather than raw Three.js for React-managed 3D experiences.

## Context

Any 3D presentation must fit the application's component lifecycle and remain maintainable alongside the rest of the React interface.

## Alternatives considered

- Raw Three.js
- BabylonJS
- PlayCanvas

## Consequences

React Three Fiber enables declarative scene composition and reusable components. The team must understand both React rendering and Three.js concepts when working on 3D features.

## Implementation notes

Isolate 3D scenes behind components and keep rendering-specific state separate from application domain state.

## Related documents

- [ADR-001: React and TypeScript](ADR-001-React-TypeScript.md)
- [ADR-005: Scene Engine](ADR-005-Scene-Engine.md)

## Future review

Review if 3D requirements outgrow the React integration model.
