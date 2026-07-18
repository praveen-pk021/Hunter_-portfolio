# ADR-006: Event Bus

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Modules communicate across boundaries through a typed Event Bus.

## Context

Cross-system reactions need to remain loosely coupled and straightforward to test as the application grows.

## Alternatives considered

- Direct imports between modules
- A large Context API surface
- Redux

## Consequences

The Event Bus supports independent modules, middleware, priority dispatch, subscriptions, and bounded event history. Event names and payloads become public contracts that require care and documentation.

## Implementation notes

Publish typed events from module boundaries. Use direct calls for local dependencies; do not route ordinary component state through the bus.

## Related documents

- [ADR-005: Scene Engine](ADR-005-Scene-Engine.md)
- [ADR-007: System Core](ADR-007-System-Core.md)

## Future review

Review when event volume, observability, or state synchronisation needs change materially.
