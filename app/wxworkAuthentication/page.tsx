"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: any }) {
  const code = searchParams["code"];
  if (code) {
    signIn("credentials", {
      code: code,
      callbackUrl: "/travelServices",
    }).then((res) => {});
  } else {
    redirect(
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww9c07d84e2ca4943b&redirect_uri=https%3A%2F%2Fwww.td.masterpeak.cn%2Fchen&response_type=code&scope=snsapi_base&state=questionnaire&agentid=1000038#wechat_redirect"
    );
  }
}
