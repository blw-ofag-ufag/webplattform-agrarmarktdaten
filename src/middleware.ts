import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const productionUrls = [
  "https://www.agrimarketdata.ch",
  "https://www.dati-agrimercato.ch",
  "https://www.donnees-agrimarche.ch",
  "https://www.agrarmarktdaten.ch",
];

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;
  const { pathname } = url;

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
