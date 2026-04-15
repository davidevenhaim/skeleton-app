# Skeleton App — AI Development Guide

This is a Next.js 15 skeleton / starter theme. When helping users build features in this project, **always follow the patterns below**. They exist to keep code consistent, maintainable, and safe — even for developers who are new to the stack.

---

## Project Structure

```
src/
  app/            # Next.js App Router pages & API routes
  components/
    app/          # App-level wrappers (PageContainer, AppDialog, ThemeProvider)
    form/         # Form field components (TextInput, FormSelect, etc.)
    ui/           # shadcn/ui + custom primitives
  hooks/          # Custom React hooks (use-boolean, use-fetch, use-mutation, …)
  utils/          # Pure utility functions (date, string, formatters, …)
  lib/            # Integrations (api-client, swr-client, app-config, toast)
  store/          # Zustand global stores (auth, theme, loader)
  constants/      # App-wide constants (routes, intervals, …)
  types/          # Shared TypeScript types
  i18n/           # next-intl configuration
messages/         # en.json / he.json translation files
```

Path alias: `@/*` → `src/*`. Always use `@/` imports, never relative `../../`.

---

## 1. Boolean State — `useBoolean`

**Never** use raw `useState(false)` for toggle/flag state.

```typescript
// WRONG
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// CORRECT
import { useBoolean } from "@/hooks";

const isOpen = useBoolean();
const isLoading = useBoolean();

// Usage:
isOpen.onTrue(); // set true
isOpen.onFalse(); // set false
isOpen.onToggle(); // toggle
isOpen.value; // current boolean value
isOpen.setValue; // manual set (for edge cases)
```

---

## 2. Dates — `formatDate` + `DateFormating`

**Never** call `date-fns/format` directly or write custom date format strings.

```typescript
// WRONG
import { format } from "date-fns";
format(date, "yyyy-MM-dd");
date.toLocaleDateString();

// CORRECT
import { formatDate, DateFormating } from "@/utils/date.utils";

formatDate(date, DateFormating.ISO_DATE); // "2025-03-27"
formatDate(date, DateFormating.SLASH_DATE); // "27/03/2025"
formatDate(date, DateFormating.FULL_DATE); // "March 27, 2025"
formatDate(date, DateFormating.TIME_12_HOUR); // "03:45 PM"
formatDate(date, DateFormating.DATE_TIME_SHORT); // "Mar 27, 2025 15:45"
formatDate(date, DateFormating.SHORT_DAY_DATE); // "Thu, Mar 27"
formatDate(date, DateFormating.LONG_DAY_DATE); // "Thursday, March 27, 2025"
formatDate(date, DateFormating.TIME_24_HOUR); // "15:45"
formatDate(date, DateFormating.DAY_NAME); // "Thursday"
formatDate(date, DateFormating.HUMANIZED); // "Thursday at 3:45 PM"

// Pass locale as 3rd arg ("en" or "he"):
formatDate(date, DateFormating.FULL_DATE, locale);
```

Add new format variants to `DateFormating` enum in `src/utils/date.utils.ts` instead of hardcoding format strings elsewhere.

---

## 3. Translations — `useTranslations` (next-intl)

**Never** hardcode user-visible strings in JSX. All text must come from translation files.

```typescript
// WRONG
<h1>Welcome back</h1>
<p>Please fill in all required fields</p>

// CORRECT
import { useTranslations } from "next-intl";

const t = useTranslations("home");   // namespace from messages/en.json
<Typography variant="h1">{t("welcome")}</Typography>
```

**Adding a new translation:**

1. Add the key to `messages/en.json` under the appropriate namespace
2. Add the same key to `messages/he.json`
3. Reference it with `t("key")` in the component

**Form label/placeholder/error strings** use the `"forms"` namespace and are passed as string keys to form components — the form layer translates them automatically:

```typescript
<TextInput name="email" label="labels.email" placeholder="placeholders.email" required />
```

---

## 4. Data Fetching — `useFetch` (SWR)

**Never** use `useEffect` + `fetch`/`axios` directly for data loading.

```typescript
// WRONG
useEffect(() => {
  axios.get("/api/users").then((res) => setUsers(res.data));
}, []);

// CORRECT
import { useFetch } from "@/hooks";

const { data: users, isLoading, error } = useFetch<User[]>("/users");

// Conditional fetching (skip until ready):
const { data } = useFetch<User>(userId ? `/users/${userId}` : null);
```

- The URL is relative to `/api/proxy` — the proxy forwards it to the backend.
- `data` is `undefined` while loading. Check `isLoading` before rendering.
- `error` is set on 4xx/5xx — a toast is shown automatically; you only need to handle UI state.

---

## 5. Mutations — `useMutation` (SWR)

**Never** call `axios.post/put/patch/delete` directly in components.

```typescript
// WRONG
await axios.post("/api/proxy/users", payload);

// CORRECT
import { useMutation } from "@/hooks";

const { trigger, isMutating } = useMutation<User, CreateUserDto>("/users");

// In handler:
const newUser = await trigger({ method: "POST", data: payload });
await trigger({ method: "PUT", data: updated });
await trigger({ method: "DELETE" });
await trigger({ method: "PATCH", data: partial });
```

`isMutating` is `true` while the request is in-flight — use it to disable buttons.

---

## 6. API Paths — Constants

**Never** hardcode API path strings in components or hooks.

```typescript
// WRONG
useFetch("/users/123/profile");
trigger({ method: "POST", data: payload }); // on "/users"

// CORRECT — define in src/constants/api-routes.constants.ts (create if missing)
export const API_ROUTES = {
  USERS: {
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
    PROFILE: (id: string) => `/users/${id}/profile`
  },
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout"
  }
} as const;

// Then use:
const { data } = useFetch<User[]>(API_ROUTES.USERS.LIST);
const { trigger } = useMutation<User>(API_ROUTES.USERS.DETAIL(id));
```

---

## 7. Web Routes — `WEB_ROUTES`

**Never** hardcode page paths as strings in `<Link>` or `router.push`.

```typescript
// WRONG
<Link href="/dashboard/settings">Settings</Link>
router.push("/login");

// CORRECT
import WEB_ROUTES from "@/constants/web-routes.constants";

<Link href={WEB_ROUTES.SETTINGS}>Settings</Link>
router.push(WEB_ROUTES.LOGIN);
```

Add new routes to `src/constants/web-routes.constants.ts`:

```typescript
const WEB_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  SETTINGS: "/dashboard/settings"
} as const;
```

---

## 8. Forms — React Hook Form + Zod + `formValidator`

**Always** use the project's form stack: `useForm` + `zodResolver` + `<Form>` wrapper + form field components.

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { formValidator } from "@/components/form/utils/form-validator";
import Form from "@/components/form/Form";
import TextInput from "@/components/form/text-input";
import FormSelect from "@/components/form/form-select";

// 1. Define schema with formValidator helpers — never write raw zod manually for common cases
const schema = zod.object({
  name:     formValidator.requiredString(),
  email:    formValidator.requiredEmail(),
  password: formValidator.requiredPassword(),
  age:      formValidator.requiredPositiveNumber(),
  website:  formValidator.optionalWebUrl(),
  phone:    formValidator.requiredPhoneNumber(),
  role:     formValidator.requiredString(),
});

type FormValues = zod.infer<typeof schema>;

// 2. Create form
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: "", email: "" },
});

// 3. Render with <Form> wrapper — provides FormProvider automatically
<Form form={form} onSubmit={handleSubmit}>
  <TextInput name="name"  label="labels.name"  required />
  <TextInput name="email" label="labels.email" type="email" required />
  <FormSelect name="role" label="labels.role" options={roleOptions} required />
  <Button type="submit" loading={form.formState.isSubmitting}>
    {t("actions.save")}
  </Button>
</Form>
```

**Available `formValidator` helpers:**
| Helper | Use for |
|--------|---------|
| `requiredString()` | Any required text field |
| `optionalString()` | Optional text |
| `requiredEmail()` | Email field |
| `requiredPassword()` | Password (8-64 chars, upper+lower+number+special) |
| `requiredPasswordRelaxed()` | Password without complexity rules |
| `requiredPositiveNumber()` | Required number ≥ 1 |
| `optionalPositiveNumber()` | Optional number ≥ 0 |
| `requiredPhoneNumber({ isValidPhoneNumber })` | Phone with external validation |
| `requiredStringDate()` | Date stored as ISO string |
| `singleFile({ required })` | Single file upload |
| `multipleFiles({ minFiles })` | Multiple file upload |
| `requiredBoolean()` | Must be checked/true |
| `requiredWebUrl()` | URL format validation |
| `stringWithLength(n)` | Exactly n digits (e.g. ID number) |
| `autocompleteSelection()` | Array of `{ value, label }` objects |

---

## 9. Toasts — `toastSuccess` / `toastError` / etc.

**Never** call `sonner` directly.

```typescript
// WRONG
import { toast } from "sonner";
toast.success("Saved!");

// CORRECT
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastPromise
} from "@/lib/toast";

toastSuccess("User created!");
toastError("Something went wrong", "Please try again.");
toastWarning("This action cannot be undone.");
toastInfo("Sync in progress...");

// For async operations — shows loading → success/error automatically:
toastPromise(saveUser(data), {
  loading: "Saving...",
  success: "User saved!",
  error: "Failed to save user."
});
```

> API errors are **already toasted automatically** by the axios interceptor. Do not show a second toast for HTTP errors unless you are catching them for special handling.

---

## 10. String Utilities — `src/utils/string.utils.ts`

Use these instead of writing ad-hoc string manipulation:

```typescript
import {
  randomID,
  getRandomId,
  removeSpecialChars,
  removeAllSpaces,
  removeAllOccurrences,
  hasSubString,
  getShortCode,
  buildEmailUrl,
  buildPhoneUrl,
  buildWhatsappUrl,
  buildInstagramUrl,
  buildTiktokUrl,
  buildWazeUrl
} from "@/utils/string.utils";

randomID(); // UUID v4
getShortCode("Project Alpha"); // "X7K" — deterministic
hasSubString("Hello World", "hello"); // true (ignores special chars)
buildEmailUrl("hi@example.com"); // "mailto:hi@example.com"
buildPhoneUrl("+972501234567"); // "tel:+972501234567"
buildWhatsappUrl("0501234567"); // WhatsApp link with +972 prefix
```

---

## 11. Number Utilities — `src/utils/number.utils.ts`

```typescript
import { getMinMaxOfLength } from "@/utils/number.utils";

getMinMaxOfLength(3); // { min: 100, max: 999 }
getMinMaxOfLength(9); // { min: 100000000, max: 999999999 }
```

---

## 12. General Utilities — `src/utils/general.utils.ts`

```typescript
import {
  isEqual,
  merge,
  getRandomPastelColor,
  getIsImageValid
} from "@/utils/general.utils";

isEqual({ a: 1 }, { a: 1 }); // true — deep equality
merge(target, source); // deep merge
getRandomPastelColor(); // "#f2c4d0" — random pastel hex
await getIsImageValid(url); // boolean — async URL image check
```

---

## 13. Formatters — `src/utils/formatters.ts`

Use for displaying numbers as currency, phone, file size, etc.:

```typescript
import { inputFormatter } from "@/utils/formatters";

inputFormatter.dollar.format("1234.56"); // "$1,234.56"
inputFormatter.euro.format("1234.56"); // "€1.234,56"
inputFormatter.percent.format("12.5"); // "12.5%"
inputFormatter.phone.format("1234567890"); // "(123) 456-7890"
inputFormatter.creditCard.format("..."); // "1234 5678 9012 3456"
inputFormatter.ssn.format("..."); // "123-45-6789"
inputFormatter.integer.format("1234"); // "1,234"
inputFormatter.bytes.format("1048576"); // "1 MB"

// To strip formatting back to raw value:
inputFormatter.dollar.parse("$1,234.56"); // "1234.56"
```

---

## 14. LocalStorage — `useLocalStorage` hook

**Never** call `localStorage` directly.

```typescript
// WRONG
localStorage.setItem("key", JSON.stringify(value));
const v = JSON.parse(localStorage.getItem("key") || "{}");

// CORRECT
import {
  useLocalStorage,
  getStorage,
  setStorage,
  removeStorage
} from "@/hooks";

// Inside components (reactive):
const { state, setState, setField, resetState } = useLocalStorage(
  "my-key",
  defaultValue
);

// Outside components (imperative):
setStorage("my-key", value);
getStorage("my-key");
removeStorage("my-key");
```

---

## 15. Debounce — `useDebounce`

```typescript
import { useDebounce } from "@/hooks";

const debouncedSearch = useDebounce(searchInput, 400); // default 1500ms

useEffect(() => {
  // Only fires 400ms after user stops typing
}, [debouncedSearch]);
```

---

## 16. Clipboard — `useCopyToClipboard`

```typescript
import { useCopyToClipboard } from "@/hooks";

const { copy, copied } = useCopyToClipboard(); // copied auto-resets after 2s

<Button onClick={() => copy(text)}>
  {copied ? "Copied!" : "Copy"}
</Button>
```

---

## 17. Countdown / OTP Timer — `useCountdown`

```typescript
import { useCountdown } from "@/hooks";

const { seconds, isRunning, start, reset } = useCountdown(60);

start(); // begin counting down from 60
start(30); // begin counting down from 30
reset(); // stop and reset
```

---

## 18. Outside Click — `useOutsideClick`

```typescript
import { useOutsideClick } from "@/hooks";

const ref = useRef<HTMLDivElement>(null);
useOutsideClick(ref, () => isOpen.onFalse(), isOpen.value);

<div ref={ref}>{/* dropdown content */}</div>
```

---

## 19. Intersection Observer — `useInView`

```typescript
import { useInView } from "@/hooks";

const { ref, inView } = useInView(0.1); // 0.1 = 10% visible triggers

<div ref={ref}>
  {inView && <HeavyComponent />}
</div>
```

---

## 20. Window Size — `useWindowSize`

```typescript
import { useWindowSize } from "@/hooks";

const { width, height } = useWindowSize(); // debounced, SSR-safe (returns 0×0 until hydrated)
```

---

## 21. Previous Value — `usePrevious`

```typescript
import { usePrevious } from "@/hooks";

const prevCount = usePrevious(count);
```

---

## 22. Global State — Zustand Stores

**Auth store** (`useAuthStore`):

```typescript
import { useAuthStore } from "@/store";

const { user, token, isAuthenticated, setUser, setToken, logout } =
  useAuthStore();
```

**Theme store** (`useThemeStore`):

```typescript
import { useThemeStore } from "@/store";

const { theme, setTheme } = useThemeStore(); // "light" | "dark"
```

**Loader store** (`useLoaderStore`):

```typescript
import { useLoaderStore } from "@/store";
// Managed automatically by the axios interceptor — shows global loading indicator
```

---

## 23. App Configuration — `CONFIG`

**Never** read `process.env` directly in components or hooks. Use the typed config object.

```typescript
// WRONG
const url = process.env.NEXT_PUBLIC_SERVER_URL;

// CORRECT
import { CONFIG } from "@/lib/app-config";

CONFIG.appName; // App display name
CONFIG.appVersion; // Semver string
CONFIG.serverUrl; // Backend API base URL
CONFIG.webUrl; // Frontend origin URL
CONFIG.region; // Deployment region (e.g. "IL")
```

---

## 24. Shared UI Types — `src/types/ui.types.ts`

Use these instead of defining inline `{ label, value }` shapes:

```typescript
import type { SelectOption, MultiSelectOption, Tab } from "@/types/ui.types";

// SelectOption: { label: string; value: string }
// MultiSelectOption: { label, value, color?, icon?, disabled?, group?, children? }
// Tab: { label: string; value: string; icon: string }
```

---

## 25. Styling — Tailwind + `cn()`

**Always** use `cn()` when combining class names conditionally:

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class", className)} />
```

Use Tailwind utility classes exclusively. Do not write inline `style={{}}` objects except for truly dynamic values (e.g. `style={{ width: `${pct}%` }}`).

---

## 26. Icons — Iconify

```typescript
import { Icon } from "@iconify/react";

<Icon icon="mdi:account" className="w-5 h-5" />
<Icon icon="lucide:trash-2" />
```

Browse icons at [icon sets catalogue](https://icon-sets.iconify.design/). Never install separate icon libraries.

---

## 27. Dialogs — `AppDialog`

```typescript
import AppDialog from "@/components/app/app-dialog";

<AppDialog
  trigger={<Button>Open</Button>}
  title={t("dialog.title")}
  description={t("dialog.description")}
  size="md"  // "sm" | "md" | "lg" | "xl" | "full"
  footer={
    <>
      <Button variant="outline" onClick={close}>{t("actions.cancel")}</Button>
      <Button onClick={handleConfirm}>{t("actions.confirm")}</Button>
    </>
  }
>
  {/* Dialog body */}
</AppDialog>
```

---

## 28. Page Layout — `PageContainer`

Wrap every page with `PageContainer` to get consistent title, actions, and padding:

```typescript
import PageContainer from "@/components/app/page-container";

export default function SettingsPage() {
  return (
    <PageContainer title={t("pages.settings")} actions={<Button>Save</Button>}>
      {/* page content */}
    </PageContainer>
  );
}
```

---

## Adding New Utilities / Hooks

Before writing custom logic, check if it already exists:

| Need                  | Look in                                                |
| --------------------- | ------------------------------------------------------ |
| Toggle/flag state     | `useBoolean` in `@/hooks`                              |
| Date formatting       | `formatDate` + `DateFormating` in `@/utils/date.utils` |
| String manipulation   | `@/utils/string.utils`                                 |
| Number formatting     | `inputFormatter` in `@/utils/formatters`               |
| Deep equality / merge | `isEqual`, `merge` in `@/utils/general.utils`          |
| API GET               | `useFetch` in `@/hooks`                                |
| API POST/PUT/DELETE   | `useMutation` in `@/hooks`                             |
| Toast notification    | `@/lib/toast`                                          |
| Local storage         | `useLocalStorage` / `getStorage` in `@/hooks`          |
| Clipboard copy        | `useCopyToClipboard` in `@/hooks`                      |
| Debounce              | `useDebounce` in `@/hooks`                             |
| Countdown timer       | `useCountdown` in `@/hooks`                            |
| Outside click         | `useOutsideClick` in `@/hooks`                         |
| Scroll visibility     | `useInView` in `@/hooks`                               |
| Window dimensions     | `useWindowSize` in `@/hooks`                           |
| Previous value        | `usePrevious` in `@/hooks`                             |

If adding a new utility:

- Add date formats to `DateFormating` enum in `src/utils/date.utils.ts`
- Add string helpers to `src/utils/string.utils.ts`
- Add API routes to `src/constants/api-routes.constants.ts`
- Add web routes to `src/constants/web-routes.constants.ts`
- Add new custom hooks to `src/hooks/` and export from `src/hooks/index.ts`

---

## Key Rules Summary

1. Boolean state → `useBoolean`, never `useState(false)`
2. Dates → `formatDate(date, DateFormating.X)`, never raw `format()` or `.toLocaleDateString()`
3. Text → `useTranslations`, never hardcoded strings in JSX
4. Data fetching → `useFetch`, never `useEffect + axios.get`
5. Mutations → `useMutation`, never `axios.post/put/delete` in components
6. API paths → constants in `api-routes.constants.ts`, never inline strings
7. Web routes → `WEB_ROUTES`, never inline `"/path"` strings
8. Forms → `formValidator` + `<Form>` + form components, never `<input>` elements
9. Toasts → `toastSuccess/Error/...`, never `sonner` directly
10. LocalStorage → `useLocalStorage` / `getStorage`, never `localStorage` directly
11. Env vars → `CONFIG`, never `process.env` in components
12. Styling → `cn()` + Tailwind, never inline `style={{}}` for static values
13. Icons → `<Icon icon="..." />` from Iconify, never other icon libraries
