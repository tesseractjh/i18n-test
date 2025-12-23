import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE_NAME,
  locales,
} from "./i18n/config";

function getLocaleFromHeaders(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  const languages = negotiator.languages();

  try {
    return match(languages, locales as unknown as string[], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

function getLocale(request: NextRequest): string {
  // 1. 쿠키에서 언어 설정 확인
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language 헤더에서 언어 감지
  return getLocaleFromHeaders(request);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이미 locale prefix가 있는지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 루트 또는 locale prefix 없는 경로: 언어 감지 후 리다이렉트
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // 쿼리 파라미터 유지
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // 모든 경로에서 실행하되, 특정 패턴 제외
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
