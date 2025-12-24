import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Next.js 16: 함수명이 middleware에서 proxy로 변경됨
export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ko|en)/:path*']
};

