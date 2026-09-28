import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Next.js redirect matchers are case-insensitive, so a `/FAQ` entry in
 * `next.config.ts` also catches `/faq` and redirects the canonical route to
 * itself. Keep this tiny proxy scoped to the FAQ path and inspect the original
 * pathname so the uppercase legacy URL has one hop and the lowercase route is
 * left alone.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/FAQ") {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = "/faq";

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/FAQ", "/faq"],
};
