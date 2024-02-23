import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const currentUser = req.cookies.get("currentUser")?.value;

  if (currentUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/"],
};
