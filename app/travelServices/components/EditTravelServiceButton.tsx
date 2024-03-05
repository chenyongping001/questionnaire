import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTravelServiceButton = ({
  travelServiceId,
}: {
  travelServiceId: number;
}) => {
  return (
    <Button size={"3"}>
      <Pencil2Icon />
      <Link href={`/travelServices/${travelServiceId}/edit`}>修改疗休养</Link>
    </Button>
  );
};

export default EditTravelServiceButton;
