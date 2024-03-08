import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteTravelServiceButton from "../components/DeleteTravelServiceButton";
import EditTravelServiceButton from "../components/EditTravelServiceButton";
import TravelServiceDetail from "../components/TravelServiceDetail";
import { getTravelService } from "./getTravelService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import RatingTravelServiceButton from "../components/RatingTravelServiceButton";
import StatusSwitch from "../components/StatusSwitch";
import RatingsLink from "../components/RatingsLink";
import { Metadata } from "next";
import { TravelServiceStatus } from "@prisma/client";

interface Props {
  params: { id: string };
}

const TravelServiceDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap={"4"}>
      <Box className="md:col-span-3" mb={"3"}>
        <TravelServiceDetail travelService={travelService} />
      </Box>
      <Box>
        <Flex direction={"column"} gap={"3"}>
          {session?.user?.role === "ADMIN" &&
            travelService.status === TravelServiceStatus.DRAFT && (
              <Card variant="ghost">
                <Grid columns={"1"} gap={"3"}>
                  <EditTravelServiceButton travelServiceId={travelService.id} />
                  <DeleteTravelServiceButton
                    travelServiceId={travelService.id}
                  />
                </Grid>
              </Card>
            )}

          <Card variant="ghost">
            <Grid columns={"1"} gap={"3"} mb={"3"}>
              {session?.user?.role === "ADMIN" && (
                <StatusSwitch travelService={travelService} />
              )}
              {travelService.status !== TravelServiceStatus.DRAFT && (
                <RatingsLink travelServiceId={travelService.id} />
              )}
              {travelService.status === TravelServiceStatus.RATING &&
                travelService.ratingUsers.includes(
                  `${session?.user?.ygdm!}|${session?.user?.ygmc!}`
                ) && (
                  <RatingTravelServiceButton
                    travelServiceId={travelService.id}
                    session={session!}
                  />
                )}
            </Grid>
          </Card>
        </Flex>
      </Box>
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "疗休养信息查看",
  description: "疗休养信息查看",
};
export default TravelServiceDetailPage;
