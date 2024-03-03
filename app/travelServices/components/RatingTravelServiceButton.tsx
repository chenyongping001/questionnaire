import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const RatingTravelServiceButton = ({
  travelServiceId,
}: {
  travelServiceId: number;
}) => {
  return (
    <Button size={"3"}>
      <Pencil2Icon />
      <Link href={`/travelServices/${travelServiceId}/ratings/new`}>
        进行本次疗休养评价
      </Link>
    </Button>
  );
};

export default RatingTravelServiceButton;
