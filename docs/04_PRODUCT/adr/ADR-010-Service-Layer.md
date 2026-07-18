# ADR-010: Service Layer

- **Status:** Accepted
- **Date:** 2026-07-18

## Decision

Separate business and data-access logic from presentation components in a service layer.

## Context

UI code should remain testable and adaptable as APIs, content sources, and integrations evolve.

## Alternatives considered

- Direct data imports and business logic in UI components

## Consequences

Services make business rules easier to test and prepare the application for APIs or CMS integration. They introduce an additional boundary that should not merely proxy every UI call.

## Implementation notes

Expose typed, domain-oriented service APIs. Components should request outcomes rather than implement data transformation rules.

## Related documents

- [ADR-008: Feature-first Module Architecture](ADR-008-Module-Architecture.md)
- [ADR-011: Plugin Architecture](ADR-011-Plugin-Architecture.md)

## Future review

Review before introducing a new backend, CMS, or significant external integration.
