import { NextResponse, type NextRequest } from "next/server";

// Host routing for the product subdomain.
//
//   fahimna.app            — the company: landing, pricing, legal, credits.
//   quran.fahimna.app      — the Quran product. Today: shareable ayah pages
//                            and the deep-link target for the native apps.
//                            Later: the web app itself, on the same URLs.
//
// quran.fahimna.app/2/255 (?to=257) is the permanent address of an ayah. It
// is served by the /ayah/[surah]/[ayah] page in this project via rewrite, so
// the address never changes when the thing answering it does.
//
// IMPORTANT for the future web app: whatever takes over quran.fahimna.app
// must keep serving /.well-known/apple-app-site-association and
// /.well-known/assetlinks.json — they are what let the native apps claim
// these links.

const PRODUCT_HOST = "quran.fahimna.app";
const AYAH_PATH = /^\/(\d{1,3})\/(\d{1,3})\/?$/;

export default function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname, search } = req.nextUrl;

  if (host === PRODUCT_HOST || host.startsWith(`${PRODUCT_HOST}:`)) {
    // Association files and Next internals pass straight through.
    if (pathname.startsWith("/.well-known/") || pathname.startsWith("/_next/")) {
      return NextResponse.next();
    }
    const m = AYAH_PATH.exec(pathname);
    if (m) {
      const url = req.nextUrl.clone();
      url.pathname = `/ayah/${m[1]}/${m[2]}`;
      return NextResponse.rewrite(url);
    }
    // Nothing else lives on the product host yet — send the rest home.
    return NextResponse.redirect(`https://fahimna.app${pathname === "/" ? "" : pathname}${search}`, 302);
  }

  // Courtesy: the pre-subdomain address forwards to the canonical one.
  const legacy = /^\/ayah\/(\d{1,3})\/(\d{1,3})\/?$/.exec(pathname);
  if (legacy) {
    return NextResponse.redirect(`https://${PRODUCT_HOST}/${legacy[1]}/${legacy[2]}${search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
