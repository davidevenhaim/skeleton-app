/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "@/lib/app-config";

const SERVER_URL = CONFIG.serverUrl;

async function handleProxy(
  req: NextRequest,
  pathParam: { [key: string]: any }
) {
  let pathArray: string[] = [];
  if (Array.isArray(pathParam.path)) {
    pathArray = pathParam.path;
  } else if (typeof pathParam === "object") {
    pathArray = Object.values(pathParam).flat();
  }

  if (!pathArray.length) {
    return NextResponse.json(
      { message: "Invalid request: No path provided" },
      { status: 400 }
    );
  }
  const endpoint = pathArray.join("/");
  const originalUrl = new URL(req.url);
  const queryString = originalUrl.search;
  const apiUrl = `${SERVER_URL}/${endpoint}${queryString}`;
  console.log(`🔄 Proxying request to: ${apiUrl}`);

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      const data = await req.json();
      body = JSON.stringify(data);
      console.log("📝 Parsed body=", data);
    } catch (err) {
      console.log("🛑 Error parsing JSON:", err);
    }
  }

  try {
    const incomingCookie = req.headers.get("cookie");
    const newHeaders = new Headers(req.headers);

    newHeaders.set("Content-Type", "application/json");
    newHeaders.delete("content-length");
    if (incomingCookie) {
      newHeaders.set("Cookie", incomingCookie);
    }

    const requestOptions: RequestInit = {
      method: req.method || "GET",
      headers: newHeaders,
      credentials: "include",
      body
    };
    const response = await fetch(apiUrl, requestOptions);

    // Parse the backend response
    const contentType = response.headers.get("content-type");
    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    console.log(`✅ Received response from backend (${response.status})`);

    const nextResp = NextResponse.json(responseData, {
      status: response.status
    });
    const setCookieValue = response.headers.get("set-cookie");
    console.log("setCookieValue: ", setCookieValue);
    if (setCookieValue) {
      nextResp.headers.set("Set-Cookie", setCookieValue || "");
    }

    return nextResp;
  } catch (error) {
    console.error(
      `❌ Proxy error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: any) {
  return handleProxy(req, params);
}

export async function POST(req: NextRequest, { params }: any) {
  return handleProxy(req, params);
}

export async function PUT(req: NextRequest, { params }: any) {
  return handleProxy(req, params);
}

export async function DELETE(req: NextRequest, { params }: any) {
  return handleProxy(req, params);
}

export async function PATCH(req: NextRequest, { params }: any) {
  return handleProxy(req, params);
}
