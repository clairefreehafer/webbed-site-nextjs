import { NextResponse } from "next/server";

export async function middleware() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { message: "that can only be accessed locally. :)" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: "/admin/:path*",
};
