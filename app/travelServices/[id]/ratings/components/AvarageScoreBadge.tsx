"use client";
import { keep2Dec } from "@/app/utilities/trimTime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ScoreBadge from "./ScoreBadge";

interface Props {
  travelServiceId: number;
  badgeSize?: "1" | "2";
  textSize?: "1" | "3" | "2" | "7";
}

const AvarageScoreBadge = ({ travelServiceId, badgeSize, textSize }: Props) => {
  const {
    data: userRatings = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userRatings", travelServiceId],
    queryFn: () =>
      axios
        .get<{ score: number }[]>(
          `/api/travelServices/${travelServiceId}/ratings`
        )
        .then((res) => res.data),
  });
  if (error) return;
  if (isLoading) return <p>Loading...</p>;

  const length = userRatings?.length;
  if (!length) return;
  const avarageScore = keep2Dec(
    userRatings.reduce((prev, cur) => (prev + cur.score) / length, 0)
  );

  return (
    <ScoreBadge
      score={avarageScore}
      badgeSize={badgeSize}
      textSize={textSize}
    />
  );
};

export default AvarageScoreBadge;
