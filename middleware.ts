export const runtime = "nodejs"; // to change the runtime from Edge

import { auth } from "@/auth.config"
import { NextResponse } from "next/server"

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/groups/:path*",
        "/boards/:path*",
    ],
}

export default auth(req => {
    // console.log(req.auth);

    if (!req.auth) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }
})
