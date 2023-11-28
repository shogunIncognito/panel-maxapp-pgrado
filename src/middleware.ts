import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import validateTokenMiddleware from './utils/validateTokenMiddlew'

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get('auth-token')
  const reqUrl = req.nextUrl.pathname
  const redirect = (url: string): NextResponse => NextResponse.redirect(new URL(url, req.nextUrl).toString())

  if (token === undefined && reqUrl === '/') {
    return NextResponse.next()
  }

  const isTokenValid = await validateTokenMiddleware(token?.value)

  if ((isTokenValid === false || isTokenValid === undefined) && reqUrl === '/') {
    return NextResponse.next()
  }

  if (isTokenValid === false || isTokenValid === undefined) {
    return redirect('/')
  }

  const isAdmin = isTokenValid?.role === 'admin'

  if (['/panel/users', '/panel/stadistics'].includes(reqUrl) && !isAdmin) {
    return redirect('/panel')
  }

  if (reqUrl === '/') {
    return redirect('/panel')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/panel', '/panel/:path*']
}
