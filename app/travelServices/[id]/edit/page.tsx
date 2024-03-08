import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTravelService } from "../getTravelService";
import TravelServiceForm from "../../components/TravelServiceForm";
import { Metadata } from "next";
import { TravelServiceStatus } from "@prisma/client";

interface Props {
  params: { id: string };
}
const EditTravelServicePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return <p>您不是管理员，无权操作！</p>;
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();
  if (travelService.status !== TravelServiceStatus.DRAFT)
    return <p>当前状态不允许编辑！</p>;
  return <TravelServiceForm travelService={travelService} />;
};
export const metadata: Metadata = {
  title: "疗休养信息更新",
  description: "疗休养信息更新",
};
export default EditTravelServicePage;
