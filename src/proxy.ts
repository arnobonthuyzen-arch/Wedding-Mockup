import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // Skip static files, Next.js internals, and API endpoints
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if current domain is a competition subdomain:
  // e.g., competition.domain.com, win.domain.com, or configured COMPETITION_SUBDOMAIN
  const isSubdomain =
    host.startsWith("competition.") ||
    host.startsWith("win.") ||
    Boolean(process.env.COMPETITION_SUBDOMAIN && host.includes(process.env.COMPETITION_SUBDOMAIN));

  // If accessed from a competition subdomain at the root path "/", rewrite to /competition
  if (isSubdomain && pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/competition";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
