import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const path = req.nextUrl.pathname;
  const protectedPaths = ["/notes", "/edit-note", "/new-note"];

  const res = NextResponse.next();

  try {
    res.headers.set("Vary", "Sec-CH-Prefers-Color-Scheme");
    res.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  } catch (err) {
    console.warn("⚠️ Could not set Accept-CH header:", err);
  }

  if (!token || token === "loggedout") {
    if (protectedPaths.some((p) => path.startsWith(p))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  }

  try {
    const decoded = jwt.decode(token) as { role?: string } | null;

    if (decoded?.role !== "demo-user" && ["/login", "/signup"].includes(path)) {
      return NextResponse.redirect(new URL("/notes", req.url));
    }
  } catch (err) {
    console.error("Failed to decode JWT:", err);
  }

  return res;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/notes/:path*",
    "/edit-note/:path*",
    "/new-note",
    "/",
  ],
};
