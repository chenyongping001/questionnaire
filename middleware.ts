import { NextMiddleware, NextResponse, userAgent } from "next/server";
import withAuthorization from "./middlewares/withAuthorization";
const mainMiddleware: NextMiddleware = async (request) => {
  const res = NextResponse.next();
  if (request.nextUrl.pathname === '/wxworkAuthentication') {
    const url = request.nextUrl
    const { ua } = userAgent(request)
    if (/wxwork/i.test(JSON.stringify(ua)))
      url.searchParams.set('client', 'wxwork');
    return NextResponse.rewrite(url);
  }
  return res;
};
export default withAuthorization(mainMiddleware, ["/travelServices", "/api/travelServices", "/api/mis"]);
// export default mainMiddleware;