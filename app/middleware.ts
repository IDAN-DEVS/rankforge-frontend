import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
function isProtectedRoute(path: string) {
  return (
    protectedRoutes.some((pattern) => path.includes(pattern)) &&
    path !== "/auth/signup"
  );
}

export default function middleware(request: NextRequest) {
  const isProtected = isProtectedRoute(request.nextUrl.pathname);
  const isLoggedIn = request.cookies.get("token") !== undefined;

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }
}
