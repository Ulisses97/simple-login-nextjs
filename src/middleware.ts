import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware"

const middleware = (request: NextRequestWithAuth) =>{

const isPrivateRoutes = request.nextUrl.pathname.startsWith("/private");
const isAdminuser = request.nextauth.token?.role === "admin";

if(isPrivateRoutes && !isAdminuser){
    return NextResponse.rewrite(new URL('denied', request.url))
}
} 
const callbackOptions: NextAuthMiddlewareOptions = {

}

export default withAuth(middleware, callbackOptions)
export const config = { matcher: ["/private"] }