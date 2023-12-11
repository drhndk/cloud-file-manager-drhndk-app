import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export function afterLogin(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_SECRET_JWT
      })
      if (token) {
        const url = new URL("/", req.url)
        return NextResponse.redirect(url)
      }
    }
    return middleware(req, next)
  }
}