import axios, { type AxiosInstance } from "axios";
import { CONFIG } from "@/lib/app-config";

/**
 * Base URL for the proxy - requests go to our own domain, then the proxy
 * forwards them to the real API. This keeps the real API URL hidden from the
 * client and avoids CORS issues.
 *
 * - Client (browser): uses relative /api/proxy (same-origin)
 * - Server (SSR): uses full URL from NEXT_PUBLIC_WEB_URL
 */
const getProxyBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return "/api/proxy";
  }
  return `${CONFIG.webUrl}/api/proxy`;
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: getProxyBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
