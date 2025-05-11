import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("x-access-token")?.value;

  if (!token && req.nextUrl.pathname !== "/user/signin") {
    return NextResponse.redirect(new URL("/user/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/", "/shorts", "/subscriptions"],
  matcher: ["/shorts", "/subscriptions"],
};
