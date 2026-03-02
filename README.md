This is a [Next.js](https://nextjs.org) skeleton app with shadcn/ui, react-hook-form, and next-intl.

## Stack

- **UI**: shadcn/ui (Accordion, Button, Card, Drawer, Input, Label, Select, Tabs, Badge, Avatar, Dialog, Sheet, Calendar, Popover, Slider, InputOTP, etc.)
- **Icons**: Iconify via `@/components/ui/iconify` (all app icons use this component)
- **Forms**: react-hook-form with form components in `src/components/form`
- **Toasts**: Sonner for success/error/info/warning popups
- **i18n**: next-intl with translation files in `messages/`

## AppDialog

Reusable dialog in `src/components/app/AppDialog.tsx`:

```tsx
import { AppDialog } from "@/components/app";

<AppDialog
  trigger={<Button>Open</Button>}
  title="Title"
  description="Description"
  footer={<Button>Confirm</Button>}
  showCloseButton
>
  Content
</AppDialog>
```

## Toasts (Sonner)

Import from `@/lib/toast`:

- `toastSuccess(message, description?)`
- `toastError(message, description?)`
- `toastInfo(message, description?)`
- `toastWarning(message, description?)`
- `toastLoading(message)` / `toastDismiss(id)`
- `toastPromise(promise, { loading, success, error })`

## Form Components

All form components use `useFormContext()` and must be inside a `FormProvider` (use the `Form` wrapper):

- **TextInput** – text/number input
- **FormOTPInput** – OTP verification code
- **DateInput** – single date or date range
- **FileUpload** – file upload with optional multiple/maxSize/accept
- **FormattedInput** – formatted input (currency, phone, etc.) using formatters from `@/utils/formatters`
- **Slider** – range slider

## Formatters

Ready-to-use formatters in `src/utils/formatters.ts`:

- `dollarFormatter` – $1,234.56
- `euroFormatter` – €1.234,56
- `percentFormatter` – 12.5%
- `phoneFormatter` – (123) 456-7890
- `ssnFormatter` – 123-45-6789
- `creditCardFormatter` – 1234 5678 9012 3456

## Translations

Translation keys live under `forms` namespace. Example: `t("labels.email")`, `t("placeholders.date")`, `t("errors.required")`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
