# AGENTS.md — Project Constitution & Operational Guidelines

## 1. Core Operating Principles (Anti-Bloat & Pragmatism)

- **Zero Redundancy (Ponytail Philosophy):** Never add boilerplate code, unrequested abstractions, premature optimization, or speculative features. Write only the absolute minimum code required to fulfill the task.
- **Refactor over Expansion:** Prefer simplifying existing code instead of adding new wrapper functions or layers.
- **Fail Fast & Explicitly:** Do not swallow errors with empty `catch` blocks. Log issues with actionable context.
- **Type Safety First:** Strictly typed codebase. Never use `any` unless strictly justified. Avoid type assertions (`as Type`) where type narrowing is possible.

## 2. Architecture & Directory Conventions

- **Feature-Driven Structure:** Code is organized by domain/feature, not by file type (e.g., place components, hooks, and types inside `features/<feature-name>/`).
- **Single Source of Truth:** Centralize shared interfaces and constants; never duplicate definitions across files.
- **State Management:** Keep state as local as possible. Do not lift state to global stores without architectural need.

## 3. Workflow & Modification Protocol

Before modifying or creating any code, follow these steps:

1. **Understand First:** Read and trace the relevant existing files before writing code. Do not make assumptions about external APIs or internal utilities.
2. **Atomic Commits/Changes:** Every change must touch only the requested feature. Do not reformat unrelated files.
3. **Verification Step:** Run build and linter checks (`npm run lint && npm run type-check`) after modifications to ensure zero regression.

## 4. Code Standards & Prohibitions

- **Dependencies:** Never install new external npm packages without explicit permission.
- **Comments:** Do not write obvious comments (e.g., `// renders the button`). Comment only non-trivial business logic, edge cases, and complex algorithms.
- **Dead Code:** Clean up unused imports, commented-out code, and obsolete functions immediately.

## 5. Session State & Project Memory

- Check `docs/active_tasks.md` at the beginning of each session to know what is in flight.
- Update `docs/active_tasks.md` with:
  - Completed items
  - Known issues / Blockers
  - Next logical steps
