import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTravelService } from "../../getTravelService";
import RatingTravelServiceForm from "../components/RatingTravelServiceForm";

interface Props {
  params: { id: string };
}
const NewRatingPage = async ({ params }: Props) => {
  // 获取参数id,再获得疗休养单，
  // 显示一些必须的信息，如标题，说明，旅行社，目的地，起止日期。
  // 从疗休养单知道模板ID，获取模板连带评价条目清单。
  // 显示评价条目清单。
  // 显示每条评价条目的备选答案。
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();

  return (
    <Box>
      <RatingTravelServiceForm
        travelService={travelService}
        ratingUser={`${session?.user?.ygdm}|${session?.user?.ygmc}`}
      />
    </Box>
  );
};

export default NewRatingPage;
