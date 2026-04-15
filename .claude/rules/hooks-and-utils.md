# Hooks and Utilities Rules

This project includes shared hooks and utilities to avoid reinventing common logic.

## Rules

- Before writing custom logic, check whether a hook or utility already exists
- Prefer existing abstractions over duplicate implementations
- Add new helpers only when the need is real and recurring
- Keep utilities pure when possible
- Keep hooks focused and reusable

## Common Preferences

Prefer existing project tools for:

- boolean state
- debounce
- countdown
- previous value
- clipboard copy
- outside click
- in-view observation
- window size
- storage access
- date formatting
- string formatting
- number formatting

## Adding New Helpers

Only add a new hook or utility when:

- the logic is reused or clearly reusable
- no current project helper covers the need
- the name and location match the project structure
- it improves clarity rather than adding abstraction for its own sake
