import withAuthorization from "./middlewares/withAuthorization";
import { NextMiddleware, NextResponse, userAgent } from "next/server";
const mainMiddleware: NextMiddleware = (request) => {
  const res = NextResponse.next();
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl
    const {ua} = userAgent(request)
    url.searchParams.set('ua',ua);
    return NextResponse.rewrite(url);
  }
  return res;
};
export default withAuthorization(mainMiddleware, ["/travelServiceRatings", "/api/travelServices", "/api/mis"]);



// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse, userAgent } from 'next/server'
// import { authOptions } from './app/api/auth/[...nextauth]/authOptions';
// import { getSession } from 'next-auth/react';

// // export {default} from "next-auth/middleware";
 
// export async function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname === '/') {
//     const url = request.nextUrl
//     const {ua} = userAgent(request)
//     url.searchParams.set('ua',ua);
//     return NextResponse.rewrite(url);
//   }

//   if (!request.nextUrl.pathname.startsWith("/api/auth")) {
//     const session = await getSession({req:request});
//     if(!session) return NextResponse.rewrite(new URL('/dashboard/user', request.url));
//   }
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
  // if (request.nextUrl.pathname==="/") {
  //   const url = request.nextUrl
  //   const {ua} = userAgent(request)
  //   url.searchParams.set('ua',ua);
  //   return NextResponse.rewrite(url);
  // }
  // if (!request.nextUrl.pathname.startsWith("/api/auth")) {
  //   const session = await getServerSession(authOptions);
  //   if(!session) return NextResponse.json({errpr:'未授权'})
  // }
// }