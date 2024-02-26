import { Button, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const TravelServiceRatingsPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Button>
        <Link href="/travelServiceRatings/new">Create TravelService</Link>
      </Button>
      <Text>{session && session.user?.ygmc}</Text>
    </>
  );
};

export default TravelServiceRatingsPage;
