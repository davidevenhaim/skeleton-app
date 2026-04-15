# Forms Rules

Use the project’s form system by default.

## Default Stack

- `react-hook-form`
- `zod`
- `zodResolver`
- project form components
- `formValidator` helpers

## Rules

- Do not use raw `<input>` / `<select>` / `<textarea>` for app forms unless clearly justified.
- Use the shared `<Form>` wrapper.
- Use form field components from `src/components/form`.
- Use `formValidator` helpers for common validation patterns.
- Keep labels, placeholders, helper text, and errors translatable.
- Reuse existing field patterns before creating new field variants.

## Preferred Pattern

1. define schema
2. infer form type from schema
3. create form with `useForm`
4. render with `<Form>`
5. use shared field components

## Validation Guidance

Prefer `formValidator` helpers for:

- required strings
- email
- password
- phone
- positive numbers
- dates
- booleans
- file uploads
- URLs

Only write raw custom zod validation when the project helpers do not cover the use case clearly.

## Translation Guidance

Form labels / placeholders / helper text should use translation keys, not hardcoded strings.

## UX Guidance

- Keep field spacing and heights consistent
- Reuse existing field layouts
- Prefer explicit validation over implicit assumptions
- Preserve current UX patterns across forms
