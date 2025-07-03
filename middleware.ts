import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Handle API routes differently
  if (path.startsWith("/api/")) {
    const response = NextResponse.next();

    // Add CORS headers for API routes
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204 });
    }

    return response;
  }

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token from the cookies
  const token = request.cookies.get("PowerGridAccessToken")?.value || "";

  // Redirect logic for non-API routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware
export const config = {
  matcher: ["/api/:path*", "/login", "/signup", "/panel/:path*"],
};
