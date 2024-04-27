import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { env } from "process";
import { fetchOriginEmployees } from "../../mis/employees/fetchEmployees";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
        code: { label: "随机码", type: "text" },
      },
      async authorize(credentials, req): Promise<any> {
        const code = credentials?.code;
        if (code && code.length === 43) {
          const access_token = await axios
            .get(
              `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${env.WX_APPID}&corpsecret=${env.WX_CORPSECRET}`
            )
            .then((res) => res.data["access_token"]);
          // console.log(access_token);

          const userInfo = await axios
            .get(
              `https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token=${access_token}&code=${code}`
            )
            .then((res) => res.data);

          // console.log(userInfo);
          if (userInfo['errcode'] === 0) {
            const userid = userInfo['userid'];
            const fetchedEmployee: { ygdm: string; ygmc: string } = await fetchOriginEmployees(userid);
            const username = fetchedEmployee?.ygmc;
            const admins = env.ADMINS!;
            return { ygdm: userid, ygmc: username, role: admins.includes(userid) ? 'ADMIN' : 'WXUSER' }
          }
        }

        // console.log('手动验证')
        // console.log(credentials?.name, credentials?.password)
        if (!credentials?.name || !credentials.password) return null;
        if (credentials.name === env.SUPER_USER && credentials.password === env.SUPER_SECRET)
          return { ygdm: '00000', ygmc: '灭霸', role: 'ADMIN' }
        return null;
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
