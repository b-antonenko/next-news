import { NextResponse } from "next/server";

export function middleware(request) {
  // console.log('Middleware triggered for:', request.url);
  return NextResponse.next();
}
