"use client";
import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import Link from "next/link";

const RatingTravelServiceButton = ({
  travelServiceId,
  session,
}: {
  travelServiceId: number;
  session: Session;
}) => {
  const {
    data: userRatings = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userRatings", travelServiceId],
    queryFn: () =>
      axios
        .get<{ ratingBy: string }[]>(
          `/api/travelServices/${travelServiceId}/ratings`
        )
        .then((res) => res.data),
  });
  if (error) return;
  if (isLoading) return <p>Loading...</p>;
  if (
    userRatings &&
    userRatings.find(
      (userRating) =>
        userRating.ratingBy === `${session.user!.ygdm}|${session.user!.ygmc}`
    )
  )
    return;
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
