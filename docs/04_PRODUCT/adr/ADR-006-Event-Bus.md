# ADR-006: Event Bus

**Status:** Accepted

Hunter System modules communicate through a typed Event Bus with priority dispatch, middleware, subscriptions, and bounded history. This keeps feature modules independent and makes cross-system reactions testable.
