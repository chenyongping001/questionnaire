import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TravelServiceRatingsPage = () => {
  return (
    <Button>
      <Link href="/travelServiceRatings/new">Create TravelService</Link>
    </Button>
  );
};

export default TravelServiceRatingsPage;
