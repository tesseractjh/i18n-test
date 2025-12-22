import acceptLanguage from "accept-language";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  cookieName,
  fallbackLng,
  languages,
  type Locale,
} from "./i18n/settings";

acceptLanguage.languages([...languages]);

function getLocaleFromCookie(request: NextRequest): Locale | null {
  const cookieValue = request.cookies.get(cookieName)?.value;
  if (cookieValue && languages.includes(cookieValue as Locale)) {
    return cookieValue as Locale;
  }
  return null;
}

function getLocaleFromHeader(request: NextRequest): Locale {
  const acceptLang = request.headers.get("Accept-Language");
  const detected = acceptLanguage.get(acceptLang);
  return (detected as Locale) || fallbackLng;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이미 locale prefix가 있으면 통과
  const pathnameHasLocale = languages.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 언어 감지: 쿠키 우선, 없으면 Accept-Language 헤더
  const locale = getLocaleFromCookie(request) ?? getLocaleFromHeader(request);

  // 해당 언어로 리다이렉트
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
