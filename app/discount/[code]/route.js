// app/discount/[code]/route.js

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { code } = await params;

  const discountCode = code?.trim();

  if (!discountCode) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const url = new URL("/", request.url);

  url.searchParams.set("discount", discountCode);

  return NextResponse.redirect(url);
}
