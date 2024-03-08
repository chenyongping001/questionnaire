import { getServerSession } from "next-auth";
import TravelServiceForm from "../components/TravelServiceForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Metadata } from "next";

const NewTravelServicePage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return <p>您不是管理员，无权操作！</p>;
  return <TravelServiceForm />;
};

export const metadata: Metadata = {
  title: "添加疗休养",
  description: "添加疗休养",
};
export default NewTravelServicePage;
