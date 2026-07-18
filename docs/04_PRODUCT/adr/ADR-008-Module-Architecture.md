# ADR-008: Feature-first Module Architecture

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Organize application code by feature module rather than by page or technical layer alone.

## Context

As functionality grows, ownership and related code should remain discoverable without creating cross-feature entanglement.

## Alternatives considered

- Page-based architecture

## Consequences

Features retain cohesive ownership and scale independently. Shared code requires deliberate placement so that common folders do not become unstructured dumping grounds.

## Implementation notes

Keep feature-specific UI, state, and services together; promote code to shared layers only when it has genuine cross-feature use.

## Related documents

- [ADR-010: Service Layer](ADR-010-Service-Layer.md)
- [ADR-011: Plugin Architecture](ADR-011-Plugin-Architecture.md)

## Future review

Review after a major feature expansion or refactor.
