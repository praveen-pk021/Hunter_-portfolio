# ADR-007: System Core

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Provide a single application-wide notification system through the System Core.

## Context

Users need consistent feedback for important system events; independently implemented notifications lead to duplicate behaviour and uneven experience.

## Alternatives considered

- Independent notifications in each module

## Consequences

Notifications are consistent and easier to evolve. The core becomes a shared dependency and must remain small, stable, and accessible to feature modules.

## Implementation notes

Define notification payloads centrally and invoke the shared system through approved module boundaries.

## Related documents

- [ADR-006: Event Bus](ADR-006-Event-Bus.md)
- [ADR-010: Service Layer](ADR-010-Service-Layer.md)

## Future review

Review when notifications need persistence, remote delivery, or user-specific preferences.
