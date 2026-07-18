# ADR-009: Hunter Design System

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Maintain an independent Hunter Design System for shared visual and interaction primitives.

## Context

The product needs consistent experiences, reusable UI decisions, and a possible path to package extraction.

## Alternatives considered

- A traditional ungoverned components folder

## Consequences

Reusable primitives improve consistency and reduce duplication. The system needs ownership and documentation to avoid becoming a collection of feature-specific components.

## Implementation notes

Build components on shared tokens and document their intended use. Keep product-specific composition within feature modules.

## Related documents

- [ADR-003: Tailwind CSS v4](ADR-003-TailwindCSS.md)
- [ADR-008: Feature-first Module Architecture](ADR-008-Module-Architecture.md)

## Future review

Review if the design system is published or adopted by another application.
