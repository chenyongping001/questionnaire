import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Button>
        {session
          ? `${session.user?.ygdm}-${session.user?.ygmc}-${session.user?.role}`
          : "loading..."}
      </Button>
    </div>
  );
}
