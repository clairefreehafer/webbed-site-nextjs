import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method === "POST" && !request.url.includes("localhost:3000")) {
    return NextResponse.json({ message: "POST requests can only be done locally." }, { status: 401 });
  }
};
 
export const config = {
  matcher: "/api/:path*",
};
