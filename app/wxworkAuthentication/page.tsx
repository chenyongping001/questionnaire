import { redirect } from "next/navigation";
import SignIn from "./SignIn";
import { Metadata } from "next";
import { env } from "process";

export default async function Home({ searchParams }: { searchParams: any }) {
  const client = searchParams["client"];
  const code = searchParams["code"];
  // console.log(client, code);
  if (client === "wxwork" && !code) {
    redirect(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        env.WX_APPID
      }&redirect_uri=${encodeURI(
        env.WX_REDIRECT_URI!
      )}&response_type=code&scope=snsapi_base&state=${env.WX_STATE}&agentid=${
        env.WX_AGENTID
      }#wechat_redirect`
    );
  }
  return <SignIn code={code} />;
}
export const metadata: Metadata = {
  title: "验证用户...",
  description: "验证企业微信用户",
};
