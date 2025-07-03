// /app/api/peak/[...endpoint]/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const PEAK_API_BASE = "https://peak-prediction-api.onrender.com";
// IMPORTANT: Use a non-public environment variable for security
const PEAK_API_KEY = process.env.PEAK_API_KEY;

async function handleRequest(
  request: NextRequest,
  { params }: { params: { endpoint: string[] } },
) {
  if (!PEAK_API_KEY) {
    return NextResponse.json(
      { error: "Peak API key not configured on server" },
      { status: 500 },
    );
  }

  const endpointPath = params.endpoint.join("/");
  const url = `${PEAK_API_BASE}/${endpointPath}${request.nextUrl.search}`;

  try {
    const response = await axios({
      method: request.method,
      url: url,
      headers: {
        API_KEY: PEAK_API_KEY, // Correct header for Peak API
        "Content-Type": "application/json",
      },
      data: await request.json(),
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error in Peak API proxy:",
      error.response?.data || error.message,
    );
    return NextResponse.json(
      { error: "Failed to fetch from Peak API", details: error.response?.data },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> },
) {
  const resolvedContext = { params: await context.params };
  return handleRequest(request, resolvedContext);
}
