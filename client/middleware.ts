import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en", "ru"];
export let defaultLocale = "en";

function getLocale(request: Request): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  const currentLang = match(languages, locales, defaultLocale);

  return currentLang;
}

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get("lang")?.value;

  const locale = cookieLocale ?? getLocale(request) ?? defaultLocale;

  const pathname = request.nextUrl.pathname;

  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);

  // e.g. incoming request is /products
  // The new URL is now /en/products
  // return NextResponse.rewrite(newUrl).cookies.set("lang", "123");
  const response = NextResponse.rewrite(newUrl);
  response.cookies.set("lang", locale);

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|images|api|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
