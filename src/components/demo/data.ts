import type { DateRange } from "react-day-picker";
import type { MultiSelectOption, SelectOption } from "@/types/ui.types";

export type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

/** All `inputFormatter` variants in one demo form */
export type DemoFormattedForm = {
  formatUsd: string;
  formatEur: string;
  formatPercent: string;
  formatPhone: string;
  formatSsn: string;
  formatCreditCard: string;
  formatInteger: string;
  formatBytes: string;
};

export type DemoTextForm = {
  name: string;
  email: string;
  notes: string;
};

export type DemoSelectForm = {
  category: string;
  status: string;
  skills: string[];
};

export type DemoOtpForm = {
  otp: string;
  volume: number;
  enableNotifications: boolean;
  agree: boolean;
};

export type DemoDateFileForm = {
  date?: Date;
  dateRange?: DateRange;
  files: File[];
};

export const TABLE_USERS: DemoUser[] = [
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

export const BALANCE_DATA = [
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

export const BAR_DATA = [
  { month: "Q1", revenue: 42000, expenses: 28000 },
  { month: "Q2", revenue: 58000, expenses: 32000 },
  { month: "Q3", revenue: 51000, expenses: 29500 },
  { month: "Q4", revenue: 67000, expenses: 38000 }
];

export const CATEGORY_OPTIONS: SelectOption[] = [
  { label: "labels.categoryTechnology", value: "tech" },
  { label: "labels.categoryDesign", value: "design" },
  { label: "labels.categoryMarketing", value: "marketing" },
  { label: "labels.categoryFinance", value: "finance" }
];

export const STATUS_OPTIONS: SelectOption[] = [
  { label: "labels.statusActive", value: "active" },
  { label: "labels.statusInactive", value: "inactive" },
  { label: "labels.statusPending", value: "pending" }
];

export const MULTI_OPTIONS: MultiSelectOption[] = [
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

export type ProductGuideItem = {
  id: string;
  icon: string;
  color: string;
};

export type ProductGuideLink = ProductGuideItem & {
  href: string;
  command?: string;
};

export type ProductGuideStep = ProductGuideItem & {
  resourceIds?: string[];
  commands?: string[];
};

export const STARTER_GITHUB_URL =
  "https://github.com/davidevenhaim/skeleton-app";
export const GIT_INSTALL_URL = "https://git-scm.com/downloads";
export const NODE_INSTALL_URL = "https://nodejs.org/en/download";
export const PNPM_INSTALL_URL = "https://pnpm.io/installation";
export const VSCODE_URL = "https://code.visualstudio.com/download";
export const CURSOR_URL = "https://www.cursor.com";
export const PNPM_INSTALL_COMMAND = "npm install -g pnpm";
export const PROJECT_INSTALL_COMMAND = "pnpm install";
export const ENV_SETUP_COMMAND = "cp .env.example .env.local";
export const PROJECT_RUN_COMMAND = "pnpm dev";

export const PRODUCT_GUIDE_PURPOSE_POINTS: ProductGuideItem[] = [
  { id: "fast", icon: "lucide:zap", color: "text-amber-500" },
  { id: "tokenSavings", icon: "lucide:piggy-bank", color: "text-emerald-500" },
  { id: "organized", icon: "lucide:folders", color: "text-sky-500" },
  { id: "conventions", icon: "lucide:badge-check", color: "text-teal-500" },
  { id: "handoff", icon: "lucide:users-round", color: "text-violet-500" }
];

export const PRODUCT_GUIDE_GOOD_FIT: ProductGuideItem[] = [
  { id: "founder", icon: "lucide:rocket", color: "text-primary" },
  { id: "designer", icon: "lucide:palette", color: "text-pink-500" },
  { id: "developer", icon: "lucide:code-2", color: "text-cyan-500" },
  { id: "team", icon: "lucide:building-2", color: "text-orange-500" }
];

export const PRODUCT_GUIDE_LESS_SUITABLE: ProductGuideItem[] = [
  { id: "randomPages", icon: "lucide:shuffle", color: "text-muted-foreground" },
  {
    id: "landingPage",
    icon: "lucide:panel-top",
    color: "text-muted-foreground"
  },
  {
    id: "throwaway",
    icon: "lucide:flask-conical",
    color: "text-muted-foreground"
  },
  {
    id: "noConventions",
    icon: "lucide:triangle-alert",
    color: "text-muted-foreground"
  }
];

export const PRODUCT_GUIDE_START_STEPS: ProductGuideStep[] = [
  {
    id: "installTools",
    icon: "lucide:wrench",
    color: "text-amber-500",
    resourceIds: ["git", "node", "vscode", "cursor"],
    commands: [PNPM_INSTALL_COMMAND]
  },
  {
    id: "cloneProject",
    icon: "lucide:terminal-square",
    color: "text-foreground",
    resourceIds: ["github"]
  },
  {
    id: "openProject",
    icon: "lucide:folder-open",
    color: "text-primary",
    commands: [PROJECT_INSTALL_COMMAND]
  },
  {
    id: "startProject",
    icon: "lucide:sparkles",
    color: "text-violet-500",
    commands: [ENV_SETUP_COMMAND, PROJECT_RUN_COMMAND]
  }
];

export const PRODUCT_GUIDE_RESOURCES: ProductGuideLink[] = [
  {
    id: "github",
    icon: "lucide:github",
    color: "text-foreground",
    href: STARTER_GITHUB_URL
  },
  { id: "git", icon: "logos:git-icon", color: "", href: GIT_INSTALL_URL },
  { id: "node", icon: "logos:nodejs-icon", color: "", href: NODE_INSTALL_URL },
  {
    id: "vscode",
    icon: "logos:visual-studio-code",
    color: "",
    href: VSCODE_URL
  },
  {
    id: "cursor",
    icon: "lucide:sparkles",
    color: "text-foreground",
    href: CURSOR_URL
  },
  {
    id: "pnpm",
    icon: "logos:pnpm",
    color: "",
    href: PNPM_INSTALL_URL,
    command: PNPM_INSTALL_COMMAND
  }
];

export const PRODUCT_GUIDE_CREDITS: ProductGuideLink[] = [
  {
    id: "nextjs",
    icon: "logos:nextjs-icon",
    color: "",
    href: "https://nextjs.org"
  },
  { id: "react", icon: "logos:react", color: "", href: "https://react.dev" },
  {
    id: "shadcn",
    icon: "simple-icons:shadcnui",
    color: "text-foreground",
    href: "https://ui.shadcn.com"
  },
  {
    id: "tailwind",
    icon: "logos:tailwindcss-icon",
    color: "",
    href: "https://tailwindcss.com"
  },
  {
    id: "typescript",
    icon: "logos:typescript-icon",
    color: "",
    href: "https://www.typescriptlang.org"
  },
  {
    id: "zustand",
    icon: "lucide:layers-3",
    color: "text-emerald-500",
    href: "https://zustand-demo.pmnd.rs"
  },
  {
    id: "zod",
    icon: "lucide:shield-check",
    color: "text-sky-500",
    href: "https://zod.dev"
  },
  {
    id: "reactHookForm",
    icon: "lucide:form-input",
    color: "text-pink-500",
    href: "https://react-hook-form.com"
  },
  {
    id: "recharts",
    icon: "lucide:chart-column",
    color: "text-cyan-500",
    href: "https://recharts.org"
  },
  {
    id: "swr",
    icon: "lucide:refresh-cw",
    color: "text-violet-500",
    href: "https://swr.vercel.app"
  },
  {
    id: "vercel",
    icon: "logos:vercel-icon",
    color: "",
    href: "https://vercel.com"
  }
];
