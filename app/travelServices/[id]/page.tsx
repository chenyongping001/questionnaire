import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteTravelServiceButton from "../components/DeleteTravelServiceButton";
import EditTravelServiceButton from "../components/EditTravelServiceButton";
import TravelServiceDetail from "../components/TravelServiceDetail";
import { getTravelService } from "./getTravelService";

interface Props {
  params: { id: string };
}

const TravelServiceDetailPage = async ({ params }: Props) => {
  const travelService = await getTravelService(params.id);
  if (!travelService) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"4"}>
      <Box className="md:col-span-4">
        <TravelServiceDetail travelService={travelService} />
      </Box>
      <Box>
        <Flex direction={"column"} gap={"3"}>
          <EditTravelServiceButton travelServiceId={travelService.id} />
          <DeleteTravelServiceButton travelServiceId={travelService.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default TravelServiceDetailPage;
