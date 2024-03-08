"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  code: string;
}
const SignIn = ({ code }: Props) => {
  useEffect(() => {
    signIn("credentials", {
      code: code,
      callbackUrl: "/travelServices",
    });
  }, []);

  return <div>身份认证中...</div>;
};

export default SignIn;
