import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTravelService } from "../getTravelService";
import TravelServiceForm from "../../components/TravelServiceForm";

interface Props {
  params: { id: string };
}
const EditTravelServicePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();
  return <TravelServiceForm travelService={travelService} />;
};

export default EditTravelServicePage;
