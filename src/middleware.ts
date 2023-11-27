import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  console.log('middleware')
  return NextResponse.next()
}

// export const config = {
//   matcher: '/about/:path*'
// }
