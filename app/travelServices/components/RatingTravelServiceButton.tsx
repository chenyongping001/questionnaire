import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const RatingTravelServiceButton = ({
  travelServiceId,
}: {
  travelServiceId: number;
}) => {
  return (
    <Button size={"3"}>
      <StarIcon />
      <Link href={`/travelServices/${travelServiceId}/ratings/new`}>
        评价疗休养
      </Link>
    </Button>
  );
};

export default RatingTravelServiceButton;
