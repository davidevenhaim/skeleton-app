export type AppConfig = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  webUrl: string;
  region: string;
};

export const CONFIG: AppConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3005",
  webUrl: process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000",
  region: process.env.NEXT_PUBLIC_REGION || "IL"
};
