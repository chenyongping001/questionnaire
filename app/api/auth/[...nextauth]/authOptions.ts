import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import admins from "./admins";
import axios from "axios";
import { fetchOriginEmployees } from "../../mis/employees/fetchEmployees";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        code: { label: "随机码", type: "text" },
      },
      async authorize(credentials, req): Promise<any> {
        const code = credentials?.code;
        if (!code || code.length !== 43) return null;

        console.log("微信返回了code");
        const access_token = await axios
          .get(
            " https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww9c07d84e2ca4943b&corpsecret=rBpKbYTQuzGCkoO_B04AUfJAo7Sf9iDJ6iXRShSIdJI"
          )
          .then((res) => res.data["access_token"]);
        console.log(access_token);

        const userInfo = await axios
          .get(
            `https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token=${access_token}&code=${code}`
          )
          .then((res) => res.data);

        console.log(userInfo);
        if(userInfo['errcode']!==0) return null;
        const userid = userInfo['userid'];
        const fetchedEmployees:{ygdm:string;ygmc:string}[] = await fetchOriginEmployees(userid);
        const username = fetchedEmployees.find(employee=>employee.ygdm === userid)?.ygmc;

        return {ygdm:userid, ygmc:username, role:admins.includes(userid)?'ADMIN':'WXUSER'}


      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.role = user.role;
        token.ygdm = user.ygdm;
        token.ygmc = user.ygmc;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.role = token.role;
        session.user.ygdm = token.ygdm;
        session.user.ygmc = token.ygmc;
      }
      return session;
    },
  },
};
