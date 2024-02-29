import TravelServiceStatusBadge from "@/app/components/TravelServiceStatusBadge";
import { Prisma } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ShowRatingUsers from "./ShowRatingUsers";
import ShowTravelServiceFields, {
  travelServiceField,
} from "./ShowTravelServiceFields";
import { convertDateToString } from "@/app/utilities/trimTime";

const workerWithAttachments =
  Prisma.validator<Prisma.TravelServiceDefaultArgs>()({
    include: { UserRatingOfTracelService: true },
  });
const TravelServiceDetail = async ({
  travelService,
}: {
  travelService: Prisma.TravelServiceGetPayload<typeof workerWithAttachments>;
}) => {
  const part1Fields: travelServiceField[] = [
    { name: "travelAgency", label: "旅行社" },
    { name: "travelDestination", label: "目的地" },
    {
      name: "travelStartDate",
      label: "开始日期",
      needSub: true,
      start: 0,
      end: 10,
    },
    {
      name: "travelEndDate",
      label: "结束日期",
      needSub: true,
      start: 0,
      end: 10,
    },
    {
      name: "createBy",
      label: "创建人",
      needSub: true,
      start: 6,
    },
    { name: "description", label: "" },
  ];

  return (
    <>
      <Heading as="h2">{travelService.title}</Heading>
      <Flex className="space-x-3" mb={"5"} mt={"3"}>
        <TravelServiceStatusBadge status={travelService.status} />
        <Text color="gray">{convertDateToString(travelService.createAt)}</Text>
      </Flex>

      <Flex direction="column" gap="3">
        <ShowTravelServiceFields
          travelServiceFields={part1Fields}
          travelService={travelService}
        />
        <Heading size={"3"} color="gray" className="pt-3 px-3">
          疗休养人员名单
        </Heading>
        <ShowRatingUsers ratingUsers={travelService.ratingUsers} />
      </Flex>
    </>
  );
};

export default TravelServiceDetail;
