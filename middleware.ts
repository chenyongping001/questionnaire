import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextResponse } from "next/server";
import withAuthorization from "./middlewares/withAuthorization";
const mainMiddleware: NextMiddleware = async (request) => {
  const res = NextResponse.next();
  if (request.nextUrl.pathname === '/') {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL("/wxworkAuthentication", request.url);
        return NextResponse.redirect(url);
      }
  }
  return res;
};
// export default withAuthorization(mainMiddleware, ["/travelServices", "/api/travelServices", "/api/mis"]);
export default mainMiddleware;