# ADR-011: Plugin Architecture

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Register extensible systems through plugins rather than hardcoding every system into the application core.

## Context

Hunter System should support future capabilities without requiring invasive core changes for each addition.

## Alternatives considered

- Hardcoded systems

## Consequences

Plugins support the open/closed principle and make extensions explicit. Registration contracts must be stable, versioned when necessary, and protected from excessive core coupling.

## Implementation notes

Define narrow plugin interfaces and lifecycle hooks. Validate registrations at startup and keep plugin side effects explicit.

## Related documents

- [ADR-006: Event Bus](ADR-006-Event-Bus.md)
- [ADR-010: Service Layer](ADR-010-Service-Layer.md)

## Future review

Review before enabling third-party or dynamically loaded plugins.
