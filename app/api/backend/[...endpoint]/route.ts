// /app/api/backend/[...endpoint]/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { cookies } from "next/headers";

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function handleRequest(
  request: NextRequest,
  { params }: { params: { endpoint: string[] } },
) {
  if (!BACKEND_API_BASE) {
    return NextResponse.json(
      { error: "Backend API base URL not configured" },
      { status: 500 },
    );
  }

  // Extract access token from cookies
  let accessToken: string | undefined;
  try {
    const cookieStore = await cookies();
    accessToken = cookieStore.get("PowerGridAccessToken")?.value;
  } catch (err) {
    console.error("Error getting cookies:", err);
    return NextResponse.json(
      { error: "Failed to access cookies", details: err },
      { status: 500 },
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authentication required", details: "No access token found" },
      { status: 401 },
    );
  }

  const endpointPath = params.endpoint.join("/");
  const url = `${BACKEND_API_BASE}/${endpointPath}${request.nextUrl.search}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios({
      method: request.method,
      url: url,
      headers,
      data:
        request.method.toUpperCase() !== "GET"
          ? await request.json().catch(() => null)
          : undefined,
      httpsAgent,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error in Backend API proxy:",
      error.response?.data || error.message,
    );
    const errorDetails = error.response?.data || { message: error.message };
    return NextResponse.json(
      {
        error: "Failed to fetch from Backend API",
        details: errorDetails,
        endpoint: endpointPath,
        status: error.response?.status || 500,
      },
      { status: error.response?.status || 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> },
) {
  const resolvedContext = { params: await context.params };
  return handleRequest(request, resolvedContext);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> },
) {
  const resolvedContext = { params: await context.params };
  return handleRequest(request, resolvedContext);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> },
) {
  const resolvedContext = { params: await context.params };
  return handleRequest(request, resolvedContext);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> },
) {
  const resolvedContext = { params: await context.params };
  return handleRequest(request, resolvedContext);
}
