import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const productionUrls = [
  "agrimarketdata.ch",
  "dati-agrimercato.ch",
  "donnees-agrimarche.ch",
  "agrarmarktdaten.ch",
];

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;
  const { pathname } = url;

  console.log({ host: url.host });

  if (!productionUrls.some((prodUrl) => url.host.startsWith(prodUrl))) {
    console.log("did not match production urls");
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
