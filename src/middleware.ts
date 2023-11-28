import { NextRequest, NextResponse } from "next/server";
import redirects from "@/generated/redirects.json";

const PUBLIC_FILE = /\.(.*)$/;

const productionUrls = [
  "www.agrimarketdata.ch",
  "www.dati-agrimercato.ch",
  "www.donnees-agrimarche.ch",
  "www.agrarmarktdaten.ch",
];

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;
  const { pathname, search } = url;

  const redirect = redirectLocales(req);
  if (redirect) {
    return NextResponse.rewrite(new URL(`${redirect}${search}`, req.url));
  }

  if (!productionUrls.some((prodUrl) => url.host.startsWith(prodUrl))) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === "demo" && pwd === "amdp2023") {
      return NextResponse.next();
    }
  }

  url.pathname = "/api/basicauth";

  return NextResponse.rewrite(url);
}

const DYNAMIC_ROUTE_REGEX = /\[\w+\d*\]/g;

function redirectLocales(req: NextRequest) {
  const match = redirects.find(({ alternates }) => {
    return alternates.some((alt) => req.nextUrl.pathname.startsWith(alt));
  });
  if (match) {
    // If it's a dynamic route [slug] we need to replace the dynamic bits
    if (match.url.match(DYNAMIC_ROUTE_REGEX)) {
      const [, ...incomingSegments] = req.nextUrl.pathname.split("/");
      const [, ...outgoingSegments] = match.url.split("/");
      const redirectUrl = outgoingSegments
        .map((seg, i) => {
          return seg.match(DYNAMIC_ROUTE_REGEX) ? incomingSegments[i] : seg;
        })
        .join("/");
      return `/${redirectUrl}`;
    }
    //If we ever want to use Catch-all Segments [...slug] (https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) then that needs to be implemented
    //If we ever want to use Optional Catch-all Segments [[...slug]](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) then that needs to be implemented
  }
  return match?.url;
}
