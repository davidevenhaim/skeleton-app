# Resetting the Skeleton — Removing Demo Files

This guide tells you exactly what to delete, what to modify, and what to keep when stripping the demo content and starting your own product from scratch.

The skeleton ships with a live demo (`/demo/*`), a contact feature, and a landing page — all as working examples. None of that is infrastructure. All of it is safe to remove.

---

## What Is Demo vs. Infrastructure

**Infrastructure (keep):** UI components, form system, hooks, utils, stores, i18n setup, API proxy, layout shell, error/not-found pages, types, constants skeleton.

**Demo (delete):** Everything under `/demo`, the contact feature, the landing-page feature, demo components, demo constants, demo translation keys, demo test, demo public assets.

---

## Step 1 — Delete Directories and Files

Run these deletions. Each one is safe — nothing in the infrastructure imports from these paths.

### Entire directories

```
src/app/demo/
src/app/contact/
src/app/api/proxy/contact/
src/components/demo/
src/components/marketing/
src/features/contact/
src/features/landing-page/
public/landing-page/
```

### Individual files

```
src/constants/demo-tabs.constants.ts
src/constants/guide-sections.constants.ts
src/constants/landing-media.constants.ts
src/__tests__/contact.schema.test.ts
public/lottie/lottie-demo.json
```

---

## Step 2 — Replace the Root Page

`src/app/page.tsx` currently redirects to `/demo/guide`. Replace it with your own home page.

Minimal placeholder to unblock routing:

```tsx
export default function RootPage() {
  return null; // replace with your home page
}
```

Or redirect to your first real route:

```tsx
import { redirect } from "next/navigation";
import WEB_ROUTES from "@/constants/web-routes.constants";

export default function RootPage() {
  redirect(WEB_ROUTES.DASHBOARD); // example — add your own route first
}
```

---

## Step 3 — Clean Up Route Constants

`src/constants/web-routes.constants.ts` — remove all `DEMO_*` keys and `CONTACT`:

```ts
const WEB_ROUTES = {
  HOME: "/",
  // add your own routes here
} as const;

export default WEB_ROUTES;
```

`src/constants/api-routes.constants.ts` — remove `CONTACT`. Keep `AUTH` and `USERS` as examples, or replace them with your own:

```ts
const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  // add your own routes here
} as const;

export default API_ROUTES;
```

---

## Step 4 — Clean Up Translation Files

Edit all four locale files: `messages/en.json`, `messages/he.json`, `messages/es.json`, `messages/ar.json`.

**Remove these top-level keys:**

| Key                 | Why it's demo            |
| ------------------- | ------------------------ |
| `demo`              | entire demo UI namespace |
| `contact`           | contact feature          |
| `tabGuide`          | demo tab label           |
| `tabDashboard`      | demo tab label           |
| `tabForms`          | demo tab label           |
| `tabDialogs`        | demo tab label           |
| `tabView`           | demo tab label           |
| `tabTokenUsage`     | demo tab label           |
| `tabTechnicalGuide` | demo tab label           |
| `tabLanding`        | demo tab label           |

**Keep these** — they are infrastructure used by shared components:

| Key                | Used by                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `forms`            | form validation error messages (form field components)                                              |
| `errorBoundary`    | `src/app/error.tsx`                                                                                 |
| `notFound`         | `src/app/not-found.tsx`                                                                             |
| All shared UI keys | (`select`, `search`, `save`, `cancel`, `loading`, theme keys, language keys, pagination keys, etc.) |

After editing, keep all four locale files in sync — same keys present in all of them.

---

## Step 5 — Verify Nothing Is Broken

```bash
pnpm build        # no import errors
pnpm test         # src/__tests__/utils.test.ts should still pass
```

If the build fails, grep for the deleted paths:

```bash
grep -r "demo-tabs" src/
grep -r "guide-sections" src/
grep -r "landing-media" src/
grep -r "from.*features/contact" src/
grep -r "from.*features/landing" src/
grep -r "from.*components/demo" src/
grep -r "from.*components/marketing" src/
```

Fix any remaining imports before proceeding.

---

## What You Have After the Reset

All of this is still intact and ready to use:

| Area                        | Path                                                                             |
| --------------------------- | -------------------------------------------------------------------------------- |
| UI component library        | `src/components/ui/`                                                             |
| Form system                 | `src/components/form/`                                                           |
| App shell components        | `src/components/app/`                                                            |
| All hooks                   | `src/hooks/`                                                                     |
| All utilities               | `src/utils/`                                                                     |
| Zustand stores              | `src/store/`                                                                     |
| API client + toast + config | `src/lib/`                                                                       |
| Shared types                | `src/types/`                                                                     |
| i18n setup                  | `src/i18n/`                                                                      |
| API proxy route             | `src/app/api/proxy/[...path]/route.ts`                                           |
| Global layout               | `src/app/layout.tsx`                                                             |
| Error page                  | `src/app/error.tsx`                                                              |
| Not-found page              | `src/app/not-found.tsx`                                                          |
| Route group pattern         | `src/app/(auth)/`, `src/app/(dashboard)/` — create as needed                     |
| Constants skeleton          | `src/constants/web-routes.constants.ts`, `src/constants/api-routes.constants.ts` |
| Test setup                  | `src/test/setup.ts`, `src/__tests__/utils.test.ts`                               |

---

## Starting Your First Real Feature

After the reset, the typical first steps are:

1. Add your route groups: `src/app/(auth)/` and `src/app/(dashboard)/` with their `layout.tsx` files
2. Add your first page under the appropriate group
3. Register its path in `WEB_ROUTES`
4. Add its API endpoints in `API_ROUTES` if needed
5. Add translation keys to all locale files
6. Build UI using `src/components/ui/` and `src/components/form/`

Follow `CLAUDE.md` conventions for all new code — they still apply fully after the reset.
