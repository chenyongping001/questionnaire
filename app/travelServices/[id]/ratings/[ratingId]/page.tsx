import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Box, Card, Flex, RadioGroup, Separator, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTravelService } from "../../getTravelService";
import RatingHeader from "../components/RatingHeader";
import { getUserRating } from "../getUserRatings";
import RatingDetail from "../components/RatingDetail";

interface Props {
  params: {
    id: string;
    ratingId: string;
  };
}
const RatingDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();

  const userRating = await getUserRating(parseInt(params.ratingId));
  if (!userRating) notFound();

  return <RatingDetail travelService={travelService} userRating={userRating} />;
};

export default RatingDetailPage;
