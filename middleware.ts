import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // TODO: this doesn't work lol. add real authentication
  if (!request.url.includes("localhost:3000")) {
    return NextResponse.json(
      { message: "that can only be accessed locally. :)" },
      { status: 401 }
    );
  }
};
 
export const config = {
  matcher: "/admin/:path*",
};
