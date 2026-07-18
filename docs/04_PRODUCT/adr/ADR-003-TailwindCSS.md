# ADR-003: Tailwind CSS v4

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Use Tailwind CSS v4 with shared CSS design tokens as the styling foundation.

## Context

The interface needs consistent visual language without scattering one-off styling decisions throughout feature code.

## Alternatives considered

- CSS Modules
- Styled Components
- Emotion

## Consequences

Utility classes enable quick, co-located styling and token reuse. Readability requires disciplined component composition and a maintained token vocabulary.

## Implementation notes

Define reusable colours, spacing, typography, and motion values as tokens; avoid arbitrary values unless they represent a deliberate design decision.

## Related documents

- [ADR-009: Hunter Design System](ADR-009-Design-System.md)

## Future review

Review if the design system is extracted into a standalone package or styling constraints change.
