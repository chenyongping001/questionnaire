import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTravelService } from "../../getTravelService";
import RatingDetail from "../components/RatingDetail";
import { getUserRating } from "../getUserRatings";

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

export const metadata: Metadata = {
  title: "评分详细查看",
  description: "评分详细查看",
};
export default RatingDetailPage;
