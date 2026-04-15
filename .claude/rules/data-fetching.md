# Data Fetching and Mutation Rules

Use the project’s shared API patterns.

## Reads

Use `useFetch`.

Do not use:

- `useEffect + fetch`
- `useEffect + axios.get`
- ad hoc loading / error state for standard GET requests

## Writes

Use `useMutation`.

Do not call:

- `axios.post`
- `axios.put`
- `axios.patch`
- `axios.delete`

directly inside components.

## Rules

- API URLs should come from route constants
- loading state should come from the shared hooks
- error handling should follow the shared behavior
- avoid duplicating data-fetching patterns per component

## Preferred Behavior

- `useFetch` for query-like reads
- `useMutation` for creates / updates / deletes
- conditional fetches should pass `null` when not ready
- component code should stay focused on UI behavior, not networking ceremony

## When to Break the Pattern

Only bypass shared hooks when:

- the use case is clearly unsupported
- there is a technical reason
- the alternative is documented in the code
