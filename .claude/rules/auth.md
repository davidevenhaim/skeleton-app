# Auth Rules

## The Auth Store

All auth state lives in `src/store/auth.store.ts` (Zustand, persisted to localStorage).

```ts
const { user, token, isAuthenticated, setUser, setToken, logout } = useAuthStore();
```

| Field / Method    | Purpose                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| `user`            | Current user object (`User` type from `src/types/auth.types.ts`) or `null` |
| `token`           | Auth token string or `null`                                                |
| `isAuthenticated` | `true` when a token is present                                             |
| `setUser(user)`   | Store user + update `isAuthenticated`                                      |
| `setToken(token)` | Store token + update `isAuthenticated`                                     |
| `logout()`        | Clear all auth state and localStorage                                      |

## Login Pattern

After a successful login API call, set both user and token:

```ts
const { trigger } = useMutation(API_ROUTES.AUTH.LOGIN);

const result = await trigger({ method: "POST", data: { email, password } });
useAuthStore.getState().setToken(result.data.token);
useAuthStore.getState().setUser(result.data.user);
// then navigate to the protected page
```

## Logout Pattern

```ts
const { logout } = useAuthStore();
logout(); // clears store + localStorage
// navigate to /login or /
```

The API client also calls `logout()` automatically on any **401 Unauthorized** response.

## Role Checks — usePermissions

Never read `user.role` directly. Use `usePermissions()` from `src/hooks/use-permissions.ts`:

```ts
const { isAdmin, isAuthenticated, hasRole } = usePermissions();

if (!isAuthenticated) return <LoginPrompt />;
if (!hasRole(["admin", "editor"])) return <AccessDenied />;
```

## Conditional Rendering — PermissionGate

Use `<PermissionGate>` from `src/components/app/permission-gate.tsx` to conditionally show UI:

```tsx
<PermissionGate roles={["admin"]}>
  <AdminPanel />
</PermissionGate>
```

## User Type

The `User` type lives in `src/types/auth.types.ts`. Import from there, not from the store:

```ts
import type { User, UserRole } from "@/types/auth.types";
```

## Route Protection

For route-level protection, use Next.js middleware (`src/middleware.ts` when created) or wrap the page content in a permission check:

```tsx
// In a page component:
const { isAuthenticated } = usePermissions();
if (!isAuthenticated) redirect(WEB_ROUTES.HOME);
```

Do not store server-fetched user data in the auth store. The store is for client-side session state only.
