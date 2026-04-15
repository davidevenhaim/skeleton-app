"use client";

import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import enMessages from "../../messages/en.json";
import { Form } from "@/components/form/Form";
import {
  TextInput,
  FormOTPInput,
  DateInput,
  FileUpload,
  FormattedInput,
  FormSlider,
  FormSelect,
  FormMultiSelect,
  FormTextarea,
  FormSwitch,
  FormCheckbox,
  FormCombobox
} from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppDialog, LocaleDialog } from "@/components/app";
import { PageContainer } from "@/components/app/page-container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import StatCard from "@/components/ui/charts/stat-card";
import BalanceLineChart from "@/components/ui/charts/balance-line-chart";
import AppBarChart from "@/components/ui/charts/bar-chart";
import AppPieChart from "@/components/ui/charts/pie-chart";
import AnimatedNumber from "@/components/ui/animations/animated-number";
import { toastSuccess, toastError, toastInfo, toastWarning } from "@/lib/toast";
import { inputFormatter } from "@/utils/formatters";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useCountdown } from "@/hooks/use-countdown";
import { useWindowSize } from "@/hooks/use-window-size";
import { useLoaderStore } from "@/store/loader.store";
import { useThemeStore } from "@/store/theme.store";
import Iconify from "@/components/ui/iconify";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import type { MultiSelectOption, SelectOption } from "@/types/ui.types";

// ─── Demo data ────────────────────────────────────────────────────────────────

type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const TABLE_USERS: DemoUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Active"
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "Viewer",
    status: "Inactive"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    role: "Editor",
    status: "Pending"
  },
  {
    id: 6,
    name: "Frank Lee",
    email: "frank@example.com",
    role: "Viewer",
    status: "Active"
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@example.com",
    role: "Editor",
    status: "Inactive"
  },
  {
    id: 8,
    name: "Henry Davis",
    email: "henry@example.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: 9,
    name: "Iris Chen",
    email: "iris@example.com",
    role: "Viewer",
    status: "Active"
  },
  {
    id: 10,
    name: "Jack Wilson",
    email: "jack@example.com",
    role: "Editor",
    status: "Pending"
  },
  {
    id: 11,
    name: "Karen Taylor",
    email: "karen@example.com",
    role: "Viewer",
    status: "Active"
  },
  {
    id: 12,
    name: "Liam Anderson",
    email: "liam@example.com",
    role: "Admin",
    status: "Inactive"
  }
];

const BALANCE_DATA = [
  { date: "Jan", balance: 12000 },
  { date: "Feb", balance: 14500 },
  { date: "Mar", balance: 13200 },
  { date: "Apr", balance: 17800 },
  { date: "May", balance: 16400 },
  { date: "Jun", balance: 21000 },
  { date: "Jul", balance: 19500 },
  { date: "Aug", balance: 24200 },
  { date: "Sep", balance: 22800 },
  { date: "Oct", balance: 28600 },
  { date: "Nov", balance: 26100 },
  { date: "Dec", balance: 31500 }
];

const BAR_DATA = [
  { month: "Q1", revenue: 42000, expenses: 28000 },
  { month: "Q2", revenue: 58000, expenses: 32000 },
  { month: "Q3", revenue: 51000, expenses: 29500 },
  { month: "Q4", revenue: 67000, expenses: 38000 }
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { label: "labels.categoryTechnology", value: "tech" },
  { label: "labels.categoryDesign", value: "design" },
  { label: "labels.categoryMarketing", value: "marketing" },
  { label: "labels.categoryFinance", value: "finance" }
];

const STATUS_OPTIONS: SelectOption[] = [
  { label: "labels.statusActive", value: "active" },
  { label: "labels.statusInactive", value: "inactive" },
  { label: "labels.statusPending", value: "pending" }
];

const MULTI_OPTIONS: MultiSelectOption[] = [
  { label: "labels.stackReact", value: "react", group: "groups.frontend" },
  { label: "labels.stackNextjs", value: "nextjs", group: "groups.frontend" },
  {
    label: "labels.stackTypescript",
    value: "typescript",
    group: "groups.frontend"
  },
  { label: "labels.stackNodejs", value: "nodejs", group: "groups.backend" },
  { label: "labels.stackPostgres", value: "postgres", group: "groups.backend" },
  { label: "labels.stackRedis", value: "redis", group: "groups.backend" }
];

// ─── Guide data ───────────────────────────────────────────────────────────────

type FeatureItem = {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
  items: string[];
};
const GUIDE = enMessages.demo.guide;
const TECHNICAL_GUIDE_TAB_LABEL = "Technical Guide";

const GUIDE_FEATURES: FeatureItem[] = [
  {
    icon: "lucide:zap",
    titleKey: GUIDE.features.hooks.title,
    descriptionKey: GUIDE.features.hooks.description,
    color: "text-yellow-500",
    items: [
      "useBoolean",
      "useFetch",
      "useMutation",
      "useLocalStorage",
      "useDebounce",
      "useCopyToClipboard",
      "useCountdown",
      "useOutsideClick",
      "useInView",
      "useWindowSize",
      "usePrevious"
    ]
  },
  {
    icon: "lucide:file-edit",
    titleKey: GUIDE.features.forms.title,
    descriptionKey: GUIDE.features.forms.description,
    color: "text-blue-500",
    items: [
      "TextInput",
      "FormSelect",
      "FormCombobox",
      "FormMultiSelect",
      "FormTextarea",
      "FormSwitch",
      "FormCheckbox",
      "FormOTPInput",
      "DateInput",
      "FileUpload",
      "FormattedInput",
      "Slider"
    ]
  },
  {
    icon: "lucide:server",
    titleKey: GUIDE.features.api.title,
    descriptionKey: GUIDE.features.api.description,
    color: "text-green-500",
    items: [
      "/api/proxy route",
      "useFetch (SWR GET)",
      "useMutation (POST/PUT/DELETE)",
      "Axios interceptors",
      "Auto error toasts",
      "Route constants"
    ]
  },
  {
    icon: "lucide:layout-dashboard",
    titleKey: GUIDE.features.ui.title,
    descriptionKey: GUIDE.features.ui.description,
    color: "text-purple-500",
    items: [
      "Data table",
      "Line / bar / pie charts",
      "Stat cards",
      "Animated numbers",
      "Lottie animations",
      "AppDialog",
      "PageContainer",
      "Loading indicators"
    ]
  },
  {
    icon: "lucide:globe",
    titleKey: GUIDE.features.i18n.title,
    descriptionKey: GUIDE.features.i18n.description,
    color: "text-indigo-500",
    items: [
      "useTranslations()",
      "messages/en.json",
      "messages/he.json",
      "NEXT_LOCALE cookie",
      "LocaleDialog switcher",
      "RTL-ready"
    ]
  },
  {
    icon: "lucide:database",
    titleKey: GUIDE.features.state.title,
    descriptionKey: GUIDE.features.state.description,
    color: "text-orange-500",
    items: [
      "useAuthStore",
      "useThemeStore",
      "useLoaderStore",
      "localStorage persistence",
      "SSR-safe init"
    ]
  },
  {
    icon: "lucide:wrench",
    titleKey: GUIDE.features.utilities.title,
    descriptionKey: GUIDE.features.utilities.description,
    color: "text-teal-500",
    items: [
      "formatDate + DateFormating enum",
      "inputFormatter (dollar, phone…)",
      "randomID / getShortCode",
      "buildWhatsappUrl / buildEmailUrl",
      "isEqual / merge",
      "getRandomPastelColor"
    ]
  },
  {
    icon: "lucide:loader",
    titleKey: GUIDE.features.loading.title,
    descriptionKey: GUIDE.features.loading.description,
    color: "text-rose-500",
    items: [
      "Full-screen overlay (Axios)",
      "Inline spinner",
      "Skeleton rows",
      "Disabled region",
      "Button loading prop",
      "Per-key loading state"
    ]
  }
];

type RuleItem = { icon: string; use: string; neverKey: string };

const GOLDEN_RULES: RuleItem[] = [
  {
    icon: "lucide:toggle-right",
    use: "useBoolean",
    neverKey: GUIDE.rules.useBoolean
  },
  {
    icon: "lucide:calendar",
    use: "formatDate + DateFormating",
    neverKey: GUIDE.rules.formatDate
  },
  {
    icon: "lucide:languages",
    use: "useTranslations",
    neverKey: GUIDE.rules.useTranslations
  },
  { icon: "lucide:download", use: "useFetch", neverKey: GUIDE.rules.useFetch },
  {
    icon: "lucide:send",
    use: "useMutation",
    neverKey: GUIDE.rules.useMutation
  },
  {
    icon: "lucide:hash",
    use: "API_ROUTES constants",
    neverKey: GUIDE.rules.apiRoutes
  },
  {
    icon: "lucide:link",
    use: "WEB_ROUTES constants",
    neverKey: GUIDE.rules.webRoutes
  },
  {
    icon: "lucide:form-input",
    use: "formValidator + <Form>",
    neverKey: GUIDE.rules.forms
  },
  {
    icon: "lucide:bell",
    use: "toastSuccess / toastError",
    neverKey: GUIDE.rules.toasts
  },
  {
    icon: "lucide:hard-drive",
    use: "useLocalStorage / getStorage",
    neverKey: GUIDE.rules.storage
  },
  {
    icon: "lucide:settings-2",
    use: "CONFIG from app-config",
    neverKey: GUIDE.rules.config
  },
  {
    icon: "lucide:palette",
    use: "cn() + Tailwind utilities",
    neverKey: GUIDE.rules.styles
  },
  {
    icon: "lucide:smile",
    use: "Iconify <Icon icon='...' />",
    neverKey: GUIDE.rules.icons
  }
];

// ─── Form types ───────────────────────────────────────────────────────────────

type DemoForm = {
  name: string;
  amount?: string;
  otp?: string;
  notes?: string;
  category?: string;
  status?: string;
  skills?: string[];
  date?: Date;
  dateRange?: DateRange;
  files?: File | File[];
  volume?: number;
  agree?: boolean;
  enableNotifications?: boolean;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const tDemo = useTranslations("demo");
  const locale = useLocale();
  const form = useForm<DemoForm>({
    defaultValues: { name: "", amount: "", otp: "", volume: 50, skills: [] }
  });

  const { copy, copied } = useCopyToClipboard();
  const { seconds, isRunning, start } = useCountdown(30);
  const { width } = useWindowSize();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const chartLocale =
    locale === "he"
      ? "he-IL"
      : locale === "ar"
        ? "ar-EG"
        : locale === "es"
          ? "es-ES"
          : "en-US";
  const currentThemeLabel =
    theme === "light" ? t("themeLight") : t("themeDark");
  const translateRole = (role: string) => tDemo(`roles.${role.toLowerCase()}`);
  const translateStatus = (status: string) => {
    switch (status) {
      case "Active":
        return t("forms.labels.statusActive");
      case "Inactive":
        return t("forms.labels.statusInactive");
      case "Pending":
        return t("forms.labels.statusPending");
      default:
        return status;
    }
  };
  const tableColumns: ColumnDef<DemoUser>[] = [
    { key: "name", header: t("forms.labels.name"), sortable: true },
    { key: "email", header: t("forms.labels.email"), sortable: true },
    {
      key: "role",
      header: tDemo("table.role"),
      sortable: true,
      cell: (row) => (
        <Badge variant='secondary'>{translateRole(row.role)}</Badge>
      )
    },
    {
      key: "status",
      header: t("forms.labels.status"),
      sortable: true,
      cell: (row) => (
        <Badge
          variant={
            row.status === "Active"
              ? "default"
              : row.status === "Pending"
                ? "outline"
                : "destructive"
          }
        >
          {translateStatus(row.status)}
        </Badge>
      )
    }
  ];
  const pieData = [
    { name: translateRole("Admin"), value: 3, color: "var(--color-chart-1)" },
    { name: translateRole("Editor"), value: 4, color: "var(--color-chart-2)" },
    { name: translateRole("Viewer"), value: 5, color: "var(--color-chart-3)" }
  ];
  const quickDirectories = [
    { path: "src/hooks/", desc: GUIDE.quickReference.directories.hooks },
    {
      path: "src/components/form/",
      desc: GUIDE.quickReference.directories.form
    },
    { path: "src/utils/", desc: GUIDE.quickReference.directories.utils },
    { path: "src/lib/", desc: GUIDE.quickReference.directories.lib },
    { path: "src/store/", desc: GUIDE.quickReference.directories.store },
    {
      path: "src/constants/",
      desc: GUIDE.quickReference.directories.constants
    },
    { path: "src/types/", desc: GUIDE.quickReference.directories.types },
    { path: "messages/", desc: GUIDE.quickReference.directories.messages }
  ];
  const techStack = [
    {
      layer: GUIDE.quickReference.layers.framework,
      tech: "Next.js 15 (App Router)"
    },
    { layer: GUIDE.quickReference.layers.language, tech: "TypeScript 5.9" },
    { layer: GUIDE.quickReference.layers.styling, tech: "Tailwind CSS 4" },
    { layer: GUIDE.quickReference.layers.ui, tech: "shadcn/ui + Radix UI" },
    { layer: GUIDE.quickReference.layers.forms, tech: "React Hook Form + Zod" },
    { layer: GUIDE.quickReference.layers.fetching, tech: "SWR + Axios" },
    { layer: GUIDE.quickReference.layers.state, tech: "Zustand 5" },
    { layer: GUIDE.quickReference.layers.i18n, tech: "next-intl 4.8" },
    { layer: GUIDE.quickReference.layers.charts, tech: "Recharts 3.8" },
    { layer: GUIDE.quickReference.layers.icons, tech: "Iconify" }
  ];
  const gettingStarted = [
    {
      step: "1",
      icon: "lucide:git-fork",
      title: GUIDE.gettingStarted.steps.template.title,
      description: GUIDE.gettingStarted.steps.template.description,
      code: "git clone …/skeleton-app my-app"
    },
    {
      step: "2",
      icon: "lucide:package",
      title: GUIDE.gettingStarted.steps.install.title,
      description: GUIDE.gettingStarted.steps.install.description,
      code: "pnpm install && cp .env.example .env.local"
    },
    {
      step: "3",
      icon: "lucide:rocket",
      title: GUIDE.gettingStarted.steps.build.title,
      description: GUIDE.gettingStarted.steps.build.description,
      code: "pnpm dev"
    }
  ];

  const onSubmit = (data: DemoForm) => {
    console.log(data);
    toastSuccess(
      tDemo("forms.submitSuccessTitle"),
      tDemo("forms.submitSuccessDescription")
    );
  };

  return (
    <PageContainer
      title={tDemo("pageTitle")}
      subtitle={tDemo("pageSubtitle")}
      actions={
        <div className='flex items-center gap-1'>
          <ThemeToggle />
          <LocaleDialog />
        </div>
      }
    >
      <Tabs defaultValue='dashboard' className='w-full'>
        <TabsList
          variant='line'
          className='mb-6 w-full max-w-3xl justify-start'
        >
          <TabsTrigger value='dashboard' className='gap-1.5'>
            <Iconify icon='lucide:layout-dashboard' className='size-4' />
            {t("tabDashboard")}
          </TabsTrigger>
          <TabsTrigger value='forms' className='gap-1.5'>
            <Iconify icon='lucide:file-text' className='size-4' />
            {t("tabForms")}
          </TabsTrigger>
          <TabsTrigger value='dialogs' className='gap-1.5'>
            <Iconify icon='lucide:message-square' className='size-4' />
            {t("tabDialogs")}
          </TabsTrigger>
          <TabsTrigger value='settings' className='gap-1.5'>
            <Iconify icon='lucide:settings' className='size-4' />
            {t("tabSettings")}
          </TabsTrigger>
          <TabsTrigger value='guide' className='gap-1.5'>
            <Iconify icon='lucide:book-open' className='size-4' />
            {TECHNICAL_GUIDE_TAB_LABEL}
          </TabsTrigger>
        </TabsList>

        {/* ── GUIDE TAB ─────────────────────────────────────────────────────── */}
        <TabsContent value='guide' dir='ltr' className='space-y-12'>
          {/* Hero */}
          <div className='relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12'>
            <div className='pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/5 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-16 -left-8 size-48 rounded-full bg-primary/8 blur-2xl' />
            <div className='relative'>
              <div className='mb-5 flex flex-wrap items-center gap-2'>
                {[
                  "Next.js 15",
                  "TypeScript 5",
                  "Tailwind CSS 4",
                  "shadcn/ui",
                  "SWR",
                  "React 19"
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant='secondary'
                    className='text-xs font-medium'
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <Typography
                variant='h2'
                as='h1'
                className='text-4xl font-bold tracking-tight text-foreground md:text-5xl'
              >
                skeleton-app
              </Typography>
              <Typography
                variant='body2'
                className='mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground'
              >
                {GUIDE.heroDescription}
              </Typography>
              <div className='mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Iconify
                    icon='lucide:zap'
                    className='size-4 text-yellow-500'
                  />
                  <Typography
                    variant='caption2'
                    as='span'
                    className='text-sm text-muted-foreground'
                  >
                    {GUIDE.heroStats.hooks}
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <Iconify
                    icon='lucide:file-edit'
                    className='size-4 text-blue-500'
                  />
                  <Typography
                    variant='caption2'
                    as='span'
                    className='text-sm text-muted-foreground'
                  >
                    {GUIDE.heroStats.forms}
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <Iconify
                    icon='lucide:server'
                    className='size-4 text-green-500'
                  />
                  <Typography
                    variant='caption2'
                    as='span'
                    className='text-sm text-muted-foreground'
                  >
                    {GUIDE.heroStats.api}
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <Iconify icon='lucide:bot' className='size-4 text-primary' />
                  <Typography
                    variant='caption2'
                    as='span'
                    className='text-sm text-muted-foreground'
                  >
                    {GUIDE.heroStats.claude}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <section>
            <div className='mb-6'>
              <Typography
                variant='subtitle1'
                as='h2'
                className='text-2xl font-semibold tracking-tight text-foreground'
              >
                {GUIDE.whatsIncluded.title}
              </Typography>
              <Typography
                variant='caption1'
                className='mt-1 text-muted-foreground'
              >
                {GUIDE.whatsIncluded.description}
              </Typography>
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              {GUIDE_FEATURES.map((feature) => (
                <Card
                  key={feature.titleKey}
                  className='group flex flex-col transition-shadow hover:shadow-md'
                >
                  <CardHeader className='pb-3'>
                    <div
                      className={cn(
                        "mb-2 flex size-9 items-center justify-center rounded-lg bg-muted",
                        feature.color
                      )}
                    >
                      <Iconify icon={feature.icon} className='size-5' />
                    </div>
                    <CardTitle className='text-base'>
                      {feature.titleKey}
                    </CardTitle>
                    <CardDescription className='text-xs leading-relaxed'>
                      {feature.descriptionKey}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-wrap gap-1.5 pt-0'>
                    {feature.items.map((item) => (
                      <Badge
                        key={item}
                        variant='secondary'
                        className='text-[11px] font-mono'
                      >
                        {item}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Golden Rules */}
          <section>
            <div className='mb-6'>
              <Typography
                variant='subtitle1'
                as='h2'
                className='text-2xl font-semibold tracking-tight text-foreground'
              >
                {GUIDE.goldenRules.title}
              </Typography>
              <Typography
                variant='caption1'
                className='mt-1 text-muted-foreground'
              >
                {GUIDE.goldenRules.description}{" "}
                <code className='rounded bg-muted px-1.5 py-0.5 text-xs'>
                  CLAUDE.md
                </code>
                .
              </Typography>
            </div>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {GOLDEN_RULES.map((rule, i) => (
                <div
                  key={i}
                  className='group flex gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50'
                >
                  <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10'>
                    <Iconify icon={rule.icon} className='size-4 text-primary' />
                  </div>
                  <div className='min-w-0 space-y-1'>
                    <Typography
                      variant='caption2'
                      as='p'
                      className='font-mono text-sm font-medium leading-tight text-foreground'
                    >
                      {rule.use}
                    </Typography>
                    <Typography
                      variant='caption2'
                      as='p'
                      className='text-xs leading-relaxed text-muted-foreground'
                    >
                      <Typography
                        variant='caption2'
                        as='span'
                        className='text-destructive/80'
                      >
                        {GUIDE.goldenRules.neverLabel}
                      </Typography>{" "}
                      {rule.neverKey}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <div className='mb-6'>
              <Typography
                variant='subtitle1'
                as='h2'
                className='text-2xl font-semibold tracking-tight text-foreground'
              >
                {GUIDE.quickReference.title}
              </Typography>
              <Typography
                variant='caption1'
                className='mt-1 text-muted-foreground'
              >
                {GUIDE.quickReference.description}
              </Typography>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <Iconify
                      icon='lucide:folder-open'
                      className='size-4 text-muted-foreground'
                    />
                    {GUIDE.quickReference.keyDirectories}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2 font-mono text-sm'>
                    {quickDirectories.map(({ path, desc }) => (
                      <div
                        key={path}
                        className='flex items-baseline justify-between gap-3'
                      >
                        <code className='text-[12px] text-primary shrink-0'>
                          {path}
                        </code>
                        <Typography
                          variant='caption2'
                          as='span'
                          className='truncate text-[11px] text-end text-muted-foreground'
                        >
                          {desc}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <Iconify
                      icon='lucide:layers'
                      className='size-4 text-muted-foreground'
                    />
                    {GUIDE.quickReference.techStack}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2 text-sm'>
                    {techStack.map(({ layer, tech }) => (
                      <div
                        key={layer}
                        className='flex items-center justify-between'
                      >
                        <Typography
                          variant='caption2'
                          as='span'
                          className='text-xs text-muted-foreground'
                        >
                          {layer}
                        </Typography>
                        <Badge
                          variant='outline'
                          className='text-[11px] font-medium'
                        >
                          {tech}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <div className='mb-6'>
              <Typography
                variant='subtitle1'
                as='h2'
                className='text-2xl font-semibold tracking-tight text-foreground'
              >
                {GUIDE.gettingStarted.title}
              </Typography>
              <Typography
                variant='caption1'
                className='mt-1 text-muted-foreground'
              >
                {GUIDE.gettingStarted.description}
              </Typography>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              {gettingStarted.map(
                ({ step, icon, title, description, code }) => (
                  <Card key={step} className='relative overflow-hidden'>
                    <div className='absolute end-4 top-4 text-6xl font-black leading-none text-muted/30 select-none'>
                      {step}
                    </div>
                    <CardHeader className='pb-3'>
                      <div className='mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10'>
                        <Iconify icon={icon} className='size-5 text-primary' />
                      </div>
                      <CardTitle className='text-base'>{title}</CardTitle>
                      <CardDescription className='text-xs leading-relaxed'>
                        {description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <code className='block rounded-md bg-muted px-3 py-2 text-[11px] font-mono text-foreground'>
                        {code}
                      </code>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </section>
        </TabsContent>

        {/* ── DASHBOARD TAB ─────────────────────────────────────────────────── */}
        <TabsContent value='dashboard' className='space-y-10'>
          <section>
            <Typography
              variant='subtitle2'
              as='h2'
              className='mb-4 text-lg font-semibold text-foreground'
            >
              {tDemo("dashboard.statsAndCharts")}
            </Typography>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <StatCard
                title={tDemo("dashboard.totalRevenue")}
                value={67000}
                formatter={(v) => `$${v.toLocaleString(chartLocale)}`}
                delta={14.2}
                deltaLabel={tDemo("dashboard.vsLastQuarter")}
                icon='lucide:dollar-sign'
              />
              <StatCard
                title={tDemo("dashboard.activeUsers")}
                value={TABLE_USERS.filter((u) => u.status === "Active").length}
                delta={8.1}
                deltaLabel={tDemo("dashboard.vsLastMonth")}
                icon='lucide:users'
              />
              <StatCard
                title={tDemo("dashboard.conversions")}
                value={3.74}
                formatter={(v) => `${v.toFixed(2)}%`}
                delta={-1.3}
                deltaLabel={tDemo("dashboard.vsLastMonth")}
                icon='lucide:percent'
              />
              <StatCard
                title={tDemo("dashboard.windowWidth")}
                value={width}
                formatter={(v) => `${v}px`}
                icon='lucide:monitor'
              />
            </div>

            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>{tDemo("dashboard.balanceOverTime")}</CardTitle>
                </CardHeader>
                <CardContent className='pb-4'>
                  <BalanceLineChart
                    data={BALANCE_DATA}
                    locale={chartLocale}
                    className='h-48'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {tDemo("dashboard.quarterlyRevenueVsExpenses")}
                  </CardTitle>
                </CardHeader>
                <CardContent className='pb-4'>
                  <AppBarChart
                    data={BAR_DATA}
                    xAxisKey='month'
                    series={[
                      {
                        key: "revenue",
                        label: tDemo("dashboard.revenue"),
                        color: "var(--color-chart-1)"
                      },
                      {
                        key: "expenses",
                        label: tDemo("dashboard.expenses"),
                        color: "var(--color-chart-2)"
                      }
                    ]}
                    showLegend
                    className='h-48'
                  />
                </CardContent>
              </Card>
            </div>

            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <Card className='col-span-1'>
                <CardHeader>
                  <CardTitle>{tDemo("dashboard.userRoles")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AppPieChart
                    data={pieData}
                    innerRadius={45}
                    showLegend
                    className='h-48'
                  />
                </CardContent>
              </Card>
              <Card className='col-span-2'>
                <CardHeader>
                  <CardTitle>{tDemo("dashboard.animatedNumbers")}</CardTitle>
                  <CardDescription>
                    {tDemo("dashboard.animatedNumbersDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-8'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary'>
                        <AnimatedNumber
                          value={98.6}
                          formatter={(v) => `${v.toFixed(1)}%`}
                        />
                      </div>
                      <Typography
                        variant='caption2'
                        className='mt-1 text-sm text-muted-foreground'
                      >
                        {tDemo("dashboard.uptime")}
                      </Typography>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary'>
                        <AnimatedNumber
                          value={12500}
                          formatter={(v) => v.toLocaleString(chartLocale)}
                        />
                      </div>
                      <Typography
                        variant='caption2'
                        className='mt-1 text-sm text-muted-foreground'
                      >
                        {tDemo("dashboard.requestsPerDay")}
                      </Typography>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary'>
                        <AnimatedNumber
                          value={4.9}
                          formatter={(v) => `${v.toFixed(1)} ⭐`}
                        />
                      </div>
                      <Typography
                        variant='caption2'
                        className='mt-1 text-sm text-muted-foreground'
                      >
                        {tDemo("dashboard.rating")}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <Typography
              variant='subtitle2'
              as='h2'
              className='mb-4 text-lg font-semibold text-foreground'
            >
              {tDemo("dashboard.dataTable")}
            </Typography>
            <Card>
              <CardContent className='pt-6'>
                <DataTable<DemoUser>
                  data={TABLE_USERS}
                  columns={tableColumns}
                  searchable
                  searchPlaceholder={tDemo("dashboard.searchUsers")}
                  pageSize={5}
                  getRowKey={(row) => row.id}
                  tableContainerClassName='h-[320px]'
                />
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* ── FORMS TAB ─────────────────────────────────────────────────────── */}
        <TabsContent value='forms' className='space-y-6'>
          <Form form={form} onSubmit={onSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>{tDemo("forms.textAndFormattedInputs")}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <TextInput
                    name='name'
                    label='labels.name'
                    placeholder='placeholders.name'
                    required
                  />
                  <FormattedInput
                    name='amount'
                    label='labels.amount'
                    formatter={inputFormatter.dollar}
                    placeholder='placeholders.amount'
                  />
                  <FormTextarea
                    name='notes'
                    label='labels.notes'
                    placeholder='placeholders.notes'
                    rows={3}
                    maxLength={200}
                    showCharCount
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tDemo("forms.selectAndMultiSelect")}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormSelect
                    name='category'
                    label='labels.category'
                    placeholder='select'
                    options={CATEGORY_OPTIONS}
                  />
                  <FormCombobox
                    name='status'
                    label='labels.status'
                    placeholder='select'
                    options={STATUS_OPTIONS}
                  />
                  <FormMultiSelect
                    name='skills'
                    label='labels.technologyStack'
                    options={MULTI_OPTIONS}
                    searchable
                    searchPlaceholder='placeholders.search'
                    maxDisplay={2}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tDemo("forms.otpSliderAndToggles")}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormOTPInput name='otp' label='labels.otp' length={6} />
                  <FormSlider
                    name='volume'
                    label='labels.volume'
                    min={0}
                    max={100}
                  />
                  <FormSwitch
                    name='enableNotifications'
                    label='labels.enableNotifications'
                  />
                  <FormCheckbox name='agree' label='labels.agree' />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tDemo("forms.dateAndFileUpload")}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <DateInput name='date' label='labels.date' mode='single' />
                  <DateInput
                    name='dateRange'
                    label='labels.startDate'
                    mode='range'
                  />
                  <FileUpload
                    name='files'
                    label='labels.upload'
                    multiple
                    maxSize={5 * 1024 * 1024}
                  />
                </CardContent>
              </Card>
            </div>

            <Button type='submit' size='lg'>
              <Iconify icon='lucide:send' />
              {tDemo("forms.submit")}
            </Button>
          </Form>
        </TabsContent>

        {/* ── DIALOGS TAB ───────────────────────────────────────────────────── */}
        <TabsContent value='dialogs' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>{tDemo("dialogs.toastsAndDialogs")}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              <AppDialog
                trigger={
                  <Button variant='outline'>
                    {tDemo("dialogs.openDialog")}
                  </Button>
                }
                title={tDemo("dialogs.areYouSure")}
                description={tDemo("dialogs.actionCannotBeUndone")}
                footer={
                  <Button
                    onClick={() =>
                      toastSuccess(
                        tDemo("dialogs.confirmed"),
                        tDemo("dialogs.actionExecuted")
                      )
                    }
                  >
                    {t("confirm")}
                  </Button>
                }
                showCloseButton
              >
                <Typography
                  variant='caption2'
                  className='text-sm text-muted-foreground'
                >
                  {tDemo("dialogs.deleteItemPermanently")}
                </Typography>
              </AppDialog>

              <AppDialog
                trigger={
                  <Button variant='outline'>
                    {tDemo("dialogs.nestedDialog")}
                  </Button>
                }
                title={tDemo("dialogs.welcome")}
                description={tDemo("dialogs.reusableDialog")}
                size='sm'
              >
                <Typography
                  variant='caption2'
                  className='text-sm text-foreground'
                >
                  {tDemo("dialogs.nestedBody")}
                </Typography>
              </AppDialog>

              <Button
                variant='outline'
                onClick={() =>
                  toastSuccess(
                    tDemo("dialogs.success"),
                    tDemo("dialogs.operationCompleted")
                  )
                }
              >
                <Iconify icon='lucide:check-circle' />{" "}
                {tDemo("dialogs.success")}
              </Button>
              <Button
                variant='outline'
                onClick={() =>
                  toastError(
                    tDemo("dialogs.error"),
                    tDemo("dialogs.somethingWentWrong")
                  )
                }
              >
                <Iconify icon='lucide:x-circle' /> {tDemo("dialogs.error")}
              </Button>
              <Button
                variant='outline'
                onClick={() =>
                  toastInfo(
                    tDemo("dialogs.info"),
                    tDemo("dialogs.someInformation")
                  )
                }
              >
                <Iconify icon='lucide:info' /> {tDemo("dialogs.info")}
              </Button>
              <Button
                variant='outline'
                onClick={() =>
                  toastWarning(
                    tDemo("dialogs.warning"),
                    tDemo("dialogs.pleaseBeCareful")
                  )
                }
              >
                <Iconify icon='lucide:alert-triangle' />{" "}
                {tDemo("dialogs.warning")}
              </Button>

              <Button variant='outline' loading>
                {tDemo("dialogs.loadingButton")}
              </Button>

              <Button variant='outline' onClick={() => copy("skeleton-app")}>
                <Iconify icon={copied ? "lucide:check" : "lucide:copy"} />
                {copied ? tDemo("dialogs.copied") : tDemo("dialogs.copyText")}
              </Button>

              <Button
                variant='outline'
                onClick={() => start()}
                disabled={isRunning}
              >
                <Iconify icon='lucide:timer' />
                {isRunning
                  ? tDemo("dialogs.resendIn", { seconds })
                  : tDemo("dialogs.startCountdown")}
              </Button>
            </CardContent>
          </Card>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader>
                <CardTitle className='text-sm'>
                  {tDemo("dialogs.spinnerInline")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoadingIndicator variant='spinner' loadingKey='never-exists' />
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <LoadingIndicator
                    variant='spinner'
                    loadingKey='__demo_spinner__'
                  />
                  <Typography
                    variant='caption2'
                    as='span'
                    className='text-sm text-muted-foreground'
                  >
                    {tDemo("dialogs.demoSpinner")}
                  </Typography>
                </div>
                <DemoSpinner />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-sm'>
                  {tDemo("dialogs.skeletonRows")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoadingIndicator
                  variant='skeleton'
                  skeletonRows={3}
                  loadingKey='__demo_skeleton__'
                />
                <DemoSkeleton />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-sm'>
                  {tDemo("dialogs.disabledRegion")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoadingIndicator
                  variant='disabled'
                  loadingKey='__demo_disabled__'
                >
                  <DemoDisabledRegion />
                </LoadingIndicator>
                <DemoDisabledTrigger />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-sm'>
                  {tDemo("dialogs.overlayAxios")}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm text-muted-foreground'>
                {tDemo("dialogs.overlayDescription")}{" "}
                <code className='rounded bg-muted px-1 text-xs'>
                  layout.tsx
                </code>
                .
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── SETTINGS TAB ──────────────────────────────────────────────────── */}
        <TabsContent value='settings' className='max-w-xl space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>{t("themeCurrentLabel")}</CardTitle>
              <CardDescription>
                {tDemo("settings.themeDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap items-center gap-3'>
                <ThemeToggle />
                <LocaleDialog />
                <Typography
                  variant='caption2'
                  as='span'
                  className='text-sm text-muted-foreground'
                >
                  {t("currentLabel")}:{" "}
                  <strong className='text-foreground'>
                    {currentThemeLabel}
                  </strong>
                </Typography>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  type='button'
                  variant={theme === "light" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setTheme("light")}
                >
                  <Iconify icon='lucide:sun' className='size-4' />
                  {t("themeLight")}
                </Button>
                <Button
                  type='button'
                  variant={theme === "dark" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setTheme("dark")}
                >
                  <Iconify icon='lucide:moon' className='size-4' />
                  {t("themeDark")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tDemo("settings.language")}</CardTitle>
              <CardDescription>{t("localeHint")}</CardDescription>
            </CardHeader>
            <CardContent className='text-sm text-muted-foreground'>
              {t("languageSettingsNote")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

// ─── Small demo helpers ───────────────────────────────────────────────────────

function DemoSpinner() {
  const tDemo = useTranslations("demo");
  const add = useLoaderStore((s) => s.add);
  const remove = useLoaderStore((s) => s.remove);
  const isOn = useLoaderStore((s) => (s.keys["__demo_spinner__"] ?? 0) > 0);
  return (
    <Button
      size='xs'
      variant='outline'
      className='mt-2'
      onClick={() =>
        isOn ? remove("__demo_spinner__") : add("__demo_spinner__")
      }
    >
      {isOn ? tDemo("dialogs.stopSpinner") : tDemo("dialogs.startSpinner")}
    </Button>
  );
}

function DemoSkeleton() {
  const tDemo = useTranslations("demo");
  const add = useLoaderStore((s) => s.add);
  const remove = useLoaderStore((s) => s.remove);
  const isOn = useLoaderStore((s) => (s.keys["__demo_skeleton__"] ?? 0) > 0);
  return (
    <Button
      size='xs'
      variant='outline'
      className='mt-2'
      onClick={() =>
        isOn ? remove("__demo_skeleton__") : add("__demo_skeleton__")
      }
    >
      {isOn ? tDemo("dialogs.hideSkeleton") : tDemo("dialogs.showSkeleton")}
    </Button>
  );
}

function DemoDisabledRegion() {
  const tDemo = useTranslations("demo");
  return (
    <div className='space-y-2'>
      <input
        className='border-input flex h-8 w-full rounded-md border bg-transparent px-3 py-1 text-sm text-start shadow-xs'
        placeholder={tDemo("dialogs.disabledPlaceholder")}
      />
      <Button size='sm' className='w-full'>
        {tDemo("dialogs.action")}
      </Button>
    </div>
  );
}

function DemoDisabledTrigger() {
  const tDemo = useTranslations("demo");
  const add = useLoaderStore((s) => s.add);
  const remove = useLoaderStore((s) => s.remove);
  const isOn = useLoaderStore((s) => (s.keys["__demo_disabled__"] ?? 0) > 0);
  return (
    <Button
      size='xs'
      variant='outline'
      className='mt-2'
      onClick={() =>
        isOn ? remove("__demo_disabled__") : add("__demo_disabled__")
      }
    >
      {isOn ? tDemo("dialogs.reEnable") : tDemo("dialogs.disableRegion")}
    </Button>
  );
}
