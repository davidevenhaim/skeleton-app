# skeleton-app

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-4-000000?logo=shadcnui&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-2.4-black)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)

A **production-ready Next.js 15 starter kit and GitHub template.** Every common building block is already wired up — forms with Zod validation, API proxy, SWR data fetching, i18n (EN + HE), dark mode, charts, animations, Zustand stores, and 11 custom hooks — so you can focus on building features from day one.

> This project ships with a `CLAUDE.md` file that instructs AI coding assistants (Claude Code, Cursor, etc.) to automatically follow every best practice described here — including which hook to use, how to call APIs, and where to put constants.

---

## Live Demo

Run `pnpm dev` and open [http://localhost:3000](http://localhost:3000). The home page is a full interactive showcase with a **Guide tab** covering every component, hook, and rule in the project.

---

## What's Included

| Category | What you get |
|----------|-------------|
| **Custom Hooks** | 11 hooks — boolean toggle, data fetching, mutations, local storage, debounce, clipboard, countdown, outside-click, intersection observer, window size, previous value |
| **Form System** | React Hook Form + Zod + 12 typed field components + `formValidator` helpers + auto error translation |
| **API Layer** | Axios instance + SWR fetcher/mutator + `/api/proxy` route that hides the backend URL from the client |
| **UI Components** | shadcn/ui primitives, data table (sortable, searchable, paginated), line/bar/pie charts, animated numbers, Lottie, dialogs, drawers |
| **i18n** | next-intl with English and Hebrew; locale stored in a cookie, switchable at runtime |
| **State Management** | Zustand stores for auth, theme, and loading — all persisted in localStorage |
| **Loading System** | Spinner, full-screen overlay, skeleton rows, disabled-region wrapper, button loading prop |
| **Utilities** | Date formatting (`DateFormating` enum), string helpers, number/currency formatters, deep equality, general utils |
| **Best Practices** | `CLAUDE.md` AI guide with 28 rules covering every system — works with Claude Code, Cursor, and similar tools |

---

## Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router) | 15 |
| Language | TypeScript | 5.9 |
| Styling | Tailwind CSS | 4 |
| UI Primitives | shadcn/ui + Radix UI | 4 / 1.4 |
| Icons | Iconify (`@iconify/react`) | 6 |
| Forms | React Hook Form + Zod | 7.7 / 4.3 |
| Data Fetching | SWR + Axios | 2.4 / 1.13 |
| State | Zustand | 5 |
| i18n | next-intl | 4.8 |
| Charts | Recharts | 3.8 |
| Animations | Lottie React | 2.4 |
| Date | date-fns | 4.1 |
| Toast | Sonner | 2 |
| Combobox | cmdk | 1.1 |
| OTP Input | input-otp | 1.4 |
| Drawer | Vaul | 1.1 |

---

## Quick Start

```bash
# 1. Use this template on GitHub, or clone it:
git clone https://github.com/your-org/skeleton-app.git my-app
cd my-app

# 2. Install dependencies (pnpm recommended)
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_SERVER_URL to your backend

# 4. Start the dev server
pnpm dev
```

---

## Environment Variables

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_SERVER_URL=http://localhost:3005   # Your backend API base URL
NEXT_PUBLIC_WEB_URL=http://localhost:3000      # Frontend origin
NEXT_PUBLIC_REGION=IL
```

**Never read `process.env` directly in components.** Use the typed `CONFIG` object instead:

```typescript
import { CONFIG } from "@/lib/app-config";

CONFIG.serverUrl   // → process.env.NEXT_PUBLIC_SERVER_URL
CONFIG.appName     // → process.env.NEXT_PUBLIC_APP_NAME
```

---

## Project Structure

```
skeleton-app/
├── messages/
│   ├── en.json               # English translations
│   └── he.json               # Hebrew translations
├── public/                   # Static assets
├── CLAUDE.md                 # AI assistant best-practices guide
└── src/
    ├── app/
    │   ├── api/proxy/        # ← API proxy route (hides backend URL)
    │   │   └── [...path]/route.ts
    │   ├── layout.tsx
    │   └── page.tsx          # Interactive demo / showcase
    ├── components/
    │   ├── app/              # PageContainer, AppDialog, ThemeProvider, LocaleDialog
    │   ├── form/             # 12 form field components + validators
    │   └── ui/               # shadcn/ui primitives, charts, animations
    ├── constants/
    │   ├── api-routes.constants.ts    # ← add your API paths here
    │   └── web-routes.constants.ts    # ← add your page routes here
    ├── hooks/                # 11 custom hooks (barrel-exported from index.ts)
    ├── i18n/                 # next-intl request config
    ├── lib/
    │   ├── api-client.ts     # Axios instance (proxied)
    │   ├── app-config.ts     # Typed CONFIG from env vars
    │   ├── swr-client.ts     # SWR fetcher + mutator
    │   ├── toast.ts          # Typed toast helpers
    │   └── utils.ts          # cn() for Tailwind class merging
    ├── store/
    │   ├── auth.store.ts     # User + token (localStorage-persisted)
    │   ├── loader.store.ts   # Global loading keys
    │   └── theme.store.ts    # light / dark (localStorage-persisted)
    ├── types/
    │   └── ui.types.ts       # SelectOption, MultiSelectOption, Tab
    └── utils/
        ├── date.utils.ts         # formatDate + DateFormating enum
        ├── formatters.ts         # inputFormatter (dollar, phone, bytes…)
        ├── general.utils.ts      # isEqual, merge, getRandomPastelColor
        ├── local-storage.utils.ts
        ├── number.utils.ts
        └── string.utils.ts       # randomID, buildWhatsappUrl, etc.
```

---

## Custom Hooks

All hooks are exported from `@/hooks`. Import what you need:

```typescript
import { useBoolean, useFetch, useMutation, useDebounce } from "@/hooks";
```

| Hook | Purpose | Key return values |
|------|---------|-------------------|
| `useBoolean(default?)` | Boolean toggle state | `{ value, onTrue, onFalse, onToggle, setValue }` |
| `useFetch<T>(url)` | SWR GET request | `{ data, isLoading, error, mutate }` |
| `useMutation<T>(url)` | POST / PUT / PATCH / DELETE | `{ trigger, isMutating, data, error }` |
| `useLocalStorage<T>(key, init)` | State synced to localStorage | `{ state, setState, setField, resetState }` |
| `useDebounce(value, delay?)` | Debounced string value | `string` |
| `useCopyToClipboard(resetMs?)` | Copy to clipboard | `{ copy, copied }` |
| `useCountdown(seconds?)` | Countdown timer | `{ seconds, isRunning, start, reset }` |
| `useOutsideClick(ref, cb, enabled?)` | Detect clicks outside an element | `void` |
| `useInView(threshold?)` | Intersection Observer | `{ ref, inView }` |
| `useWindowSize(debounceMs?)` | Debounced window dimensions | `{ width, height }` |
| `usePrevious<T>(value)` | Previous render value | `T \| undefined` |

---

## Form System

Forms use **React Hook Form** + **Zod** + `formValidator` + 12 typed field components. All field components accept a translation key for `label`, `placeholder`, and `helperText` — errors are translated automatically.

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { formValidator } from "@/components/form/utils/form-validator";
import Form from "@/components/form/Form";
import { TextInput, FormSelect } from "@/components/form";

const schema = zod.object({
  name:  formValidator.requiredString(),
  email: formValidator.requiredEmail(),
  role:  formValidator.requiredString(),
});

const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "" } });

<Form form={form} onSubmit={handleSubmit}>
  <TextInput name="name"  label="labels.name"  required />
  <TextInput name="email" label="labels.email" type="email" required />
  <FormSelect name="role" label="labels.role"  options={roleOptions} />
  <Button type="submit">Save</Button>
</Form>
```

### `formValidator` helpers

| Helper | Use for |
|--------|---------|
| `requiredString()` | Any required text field |
| `optionalString()` | Optional text |
| `requiredEmail()` | Email address |
| `requiredPassword()` | 8–64 chars, upper + lower + digit + special char |
| `requiredPasswordRelaxed()` | Password without complexity rules |
| `requiredPositiveNumber()` | Required number ≥ 1 |
| `optionalPositiveNumber()` | Optional number ≥ 0 |
| `requiredPhoneNumber({ isValidPhoneNumber })` | Phone with external validator |
| `requiredStringDate()` | ISO date string |
| `singleFile({ required })` | Single file upload |
| `multipleFiles({ minFiles })` | Multiple file upload |
| `requiredBoolean()` | Must be checked / true |
| `requiredWebUrl()` | Valid URL |
| `optionalWebUrl()` | Optional URL |
| `stringWithLength(n)` | Exactly n digits (ID numbers) |
| `autocompleteSelection()` | Array of `{ value, label }` objects |

### Form field components

| Component | Description |
|-----------|-------------|
| `TextInput` | Text / password / email inputs |
| `FormTextarea` | Multi-line text with optional char counter |
| `FormSelect` | Dropdown select |
| `FormCombobox` | Searchable select (cmdk-based) |
| `FormMultiSelect` | Multi-select with groups and tree support |
| `FormSwitch` | Toggle switch |
| `FormCheckbox` | Checkbox |
| `FormOTPInput` | OTP digit slots |
| `DateInput` | Single date or date range picker |
| `FileUpload` | Drag-and-drop file input with size/type validation |
| `FormattedInput` | Masked input (currency, phone, SSN, credit card…) |
| `Slider` | Range slider |

---

## API Layer

All requests route through a local Next.js proxy:

```
Browser → /api/proxy/[...path] → NEXT_PUBLIC_SERVER_URL/[...path]
```

- The backend URL never reaches the client's browser.
- Cookies and `Authorization` headers are forwarded automatically.
- 4xx / 5xx responses trigger a toast notification **automatically** — no per-request try/catch needed.

### Define paths as constants

```typescript
// src/constants/api-routes.constants.ts
export const API_ROUTES = {
  USERS: {
    LIST:   "/users",
    DETAIL: (id: string) => `/users/${id}`,
  },
  AUTH: {
    LOGIN:  "/auth/login",
    LOGOUT: "/auth/logout",
  },
} as const;

// Usage:
const { data } = useFetch<User[]>(API_ROUTES.USERS.LIST);
const { trigger } = useMutation<User>(API_ROUTES.USERS.DETAIL(id));
```

---

## Internationalization (i18n)

- **Library:** next-intl 4.8
- **Locales:** `en`, `he`
- **Locale switching:** `LocaleDialog` component sets the `NEXT_LOCALE` cookie
- **Translation files:** `messages/en.json` and `messages/he.json`

```typescript
import { useTranslations } from "next-intl";

const t = useTranslations("forms");
<label>{t("labels.email")}</label>   // "Email" / "אימייל"
```

**Never hardcode user-visible strings.** Add the key to both JSON files and reference via `t()`.

---

## State Management

Three Zustand stores, all persisted in localStorage:

| Store | Import | State |
|-------|--------|-------|
| Auth | `useAuthStore` from `@/store` | `user`, `token`, `isAuthenticated`, `setUser`, `setToken`, `logout` |
| Theme | `useThemeStore` from `@/store` | `theme` (`"light" \| "dark"`), `setTheme` |
| Loader | `useLoaderStore` from `@/store` | `keys` map, `add`, `remove` — managed by Axios interceptor |

---

## Loading System

```tsx
// Full-screen overlay while any Axios request is in flight (wired in layout.tsx)
<LoadingIndicator variant="overlay" loadingKey="axios" />

// Inline spinner
<LoadingIndicator variant="spinner" loadingKey="my-key" />

// Skeleton placeholder rows
<LoadingIndicator variant="skeleton" skeletonRows={4} loadingKey="my-key" />

// Disable + overlay a UI region while loading
<LoadingIndicator variant="disabled" loadingKey="save-form">
  <MyForm />
</LoadingIndicator>

// Button with built-in spinner + auto-disabled
<Button loading={isMutating}>Save</Button>
```

---

## Utilities

### Date formatting

Never call `date-fns/format` directly. Use `formatDate` with the `DateFormating` enum:

```typescript
import { formatDate, DateFormating } from "@/utils/date.utils";

formatDate(date, DateFormating.ISO_DATE);         // "2025-03-27"
formatDate(date, DateFormating.SLASH_DATE);       // "27/03/2025"
formatDate(date, DateFormating.FULL_DATE);        // "March 27, 2025"
formatDate(date, DateFormating.TIME_12_HOUR);     // "03:45 PM"
formatDate(date, DateFormating.DATE_TIME_SHORT);  // "Mar 27, 2025 15:45"
formatDate(date, DateFormating.SHORT_DAY_DATE);   // "Thu, Mar 27"
formatDate(date, DateFormating.DAY_NAME);         // "Thursday"
```

### Input formatters

```typescript
import { inputFormatter } from "@/utils/formatters";

inputFormatter.dollar.format("1234.56");    // "$1,234.56"
inputFormatter.euro.format("1234.56");      // "€1.234,56"
inputFormatter.percent.format("12.5");      // "12.5%"
inputFormatter.phone.format("1234567890");  // "(123) 456-7890"
inputFormatter.bytes.format("1048576");     // "1 MB"

inputFormatter.dollar.parse("$1,234.56");  // "1234.56"
```

### Toasts

```typescript
import { toastSuccess, toastError, toastWarning, toastInfo, toastPromise } from "@/lib/toast";

toastSuccess("Saved!", "Your changes have been applied.");
toastError("Something went wrong.");
toastPromise(saveUser(data), {
  loading: "Saving…",
  success: "User saved!",
  error:   "Failed to save.",
});
```

---

## Styling

- All styling uses **Tailwind CSS 4** utility classes.
- Use `cn()` from `@/lib/utils` when combining classes conditionally:

```typescript
import { cn } from "@/lib/utils";
<div className={cn("base-class", isActive && "active-class", className)} />
```

- **Icons:** Iconify only — `<Icon icon="lucide:trash-2" />`. Browse all icon sets at [icon-sets.iconify.design](https://icon-sets.iconify.design/).
- No inline `style={{}}` for static values.

---

## UI Components at a Glance

### `src/components/ui/`

| Component | Description |
|-----------|-------------|
| `button.tsx` | Variants + sizes + `loading` prop |
| `card.tsx` | Card / CardHeader / CardContent / CardFooter |
| `badge.tsx` | Inline status badge |
| `data-table.tsx` | Sortable, searchable, paginated generic table |
| `dialog.tsx` | Radix Dialog |
| `drawer.tsx` | Vaul Drawer (bottom sheet) |
| `loading-indicator.tsx` | `spinner` / `overlay` / `skeleton` / `disabled` variants |
| `tabs.tsx` | Radix Tabs (`default` / `line` variants) |
| `sidebar.tsx` | Full sidebar layout with mobile sheet |
| `search-input.tsx` | Debounced search with clear button |
| `empty.tsx` | Empty-state layout |
| `typography.tsx` | Heading, body, label, caption components |
| `avatar.tsx` | Radix Avatar with fallback |
| `tooltip.tsx` | Radix Tooltip |
| `sheet.tsx` | Radix Sheet (side panel) |
| `scroll-area.tsx` | Radix ScrollArea |
| `skeleton.tsx` | Skeleton placeholder |
| `fade-in.tsx` | Scroll-triggered fade-in |
| `iconify.tsx` | Iconify icon wrapper |

### `src/components/ui/charts/`

| Component | Description |
|-----------|-------------|
| `stat-card.tsx` | KPI card with animated number + trend delta |
| `balance-line-chart.tsx` | Area/line chart for time-series data |
| `bar-chart.tsx` | Grouped or stacked bar chart |
| `pie-chart.tsx` | Pie or donut chart |

### `src/components/ui/animations/`

| Component | Description |
|-----------|-------------|
| `animated-number.tsx` | Count-up animation with optional formatter |
| `animated-div-breathing.tsx` | CSS keyframe breathing pulse |

### `src/components/app/`

| Component | Description |
|-----------|-------------|
| `PageContainer` | Standard page layout — title, subtitle, actions slot |
| `AppDialog` | Reusable dialog — trigger, title, description, footer, size variants |
| `ThemeProvider` | Applies persisted `light`/`dark` class to `<html>` on mount |
| `LocaleDialog` | Language switcher — sets `NEXT_LOCALE` cookie |

---

## Best Practices & AI Guide

This project ships with `CLAUDE.md` — a machine-readable guide that AI coding assistants load automatically when you open the project. It covers 28 rules with **WRONG → CORRECT** examples for every system.

### The 13 golden rules (quick reference)

| # | Use | Never |
|---|-----|-------|
| 1 | `useBoolean` | `useState(false)` for toggles |
| 2 | `formatDate(date, DateFormating.X)` | Raw `format()` or `.toLocaleDateString()` |
| 3 | `useTranslations` | Hardcoded strings in JSX |
| 4 | `useFetch` | `useEffect + axios.get` |
| 5 | `useMutation` | `axios.post/put/delete` in components |
| 6 | Constants in `api-routes.constants.ts` | Inline API path strings |
| 7 | `WEB_ROUTES` from `web-routes.constants.ts` | Inline `"/path"` in links |
| 8 | `formValidator` + `<Form>` + field components | Raw `<input>` elements |
| 9 | `toastSuccess/Error/...` from `@/lib/toast` | `sonner` directly |
| 10 | `useLocalStorage` / `getStorage` | `localStorage` directly |
| 11 | `CONFIG` from `@/lib/app-config` | `process.env` in components |
| 12 | `cn()` + Tailwind utilities | Static inline `style={{}}` |
| 13 | Iconify `<Icon icon="..." />` | Other icon libraries |

For the full guide with code examples, see [`CLAUDE.md`](./CLAUDE.md).

---

## Contributing

1. Fork or use this template on GitHub
2. Follow the patterns in `CLAUDE.md` — or just use Claude Code and it will follow them for you
3. Add new API paths to `src/constants/api-routes.constants.ts`
4. Add new page routes to `src/constants/web-routes.constants.ts`
5. Add new hooks to `src/hooks/` and export from `src/hooks/index.ts`
6. Keep `messages/en.json` and `messages/he.json` in sync

---

*Built with Next.js 15, TypeScript 5, and Tailwind CSS 4.*
