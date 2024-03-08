import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // return (
  //   <div>
  //     <Button>
  //       {session
  //         ? `${session.user?.ygdm}-${session.user?.ygmc}-${session.user?.role}`
  //         : "loading..."}
  //     </Button>
  //   </div>
  // );
  return redirect("/travelServices");
}
export const metadata: Metadata = {
  title: "首页",
  description: "首页",
};
