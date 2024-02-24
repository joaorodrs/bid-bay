import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const currentUser = req.cookies.get("currentUser")?.value;

  if (currentUser && pathname === "/") return NextResponse.next();

  if (currentUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/login") return NextResponse.next();

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
