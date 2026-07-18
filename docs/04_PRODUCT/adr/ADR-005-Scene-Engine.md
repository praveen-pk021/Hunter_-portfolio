# ADR-005: Scene Engine

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Use a Scene Engine to control scene or module lifecycle transitions.

## Context

Navigation and immersive experiences need predictable lifecycle handling without coupling feature modules to one another.

## Alternatives considered

- React Router only

## Consequences

The engine gives transitions an explicit, testable contract and supports future scene types. It adds an application abstraction that must stay narrowly scoped to lifecycle coordination.

## Implementation notes

Keep scene types and transition rules typed. Do not use the engine as a catch-all global state store.

## Related documents

- [ADR-004: React Three Fiber](ADR-004-React-Three-Fiber.md)
- [ADR-006: Event Bus](ADR-006-Event-Bus.md)

## Future review

Review after major navigation changes or when scene transitions become a performance concern.
