import React from "react";
import { includeOfTravelService } from "../../getTravelService";
import { Prisma } from "@prisma/client";
import { Box, Callout, Heading, Flex, Text, Link } from "@radix-ui/themes";
import ScoreBadge from "./ScoreBadge";

export const TravelServiceWithIncludes =
  Prisma.validator<Prisma.TravelServiceDefaultArgs>()({
    include: includeOfTravelService,
  });
interface Props {
  travelService: Prisma.TravelServiceGetPayload<
    typeof TravelServiceWithIncludes
  >;
  score: number;
}

const RatingHeader = ({ travelService, score }: Props) => {
  return (
    <>
      <Link href={`/travelServices/${travelService.id}`}>返回疗休养信息</Link>
      <Heading as="h2">{travelService.title}</Heading>
      <Flex justify={"between"}>
        <Box>
          <Text color="gray" size={"2"} as="p">
            起止日期：{travelService.travelStartDate}至
            {travelService.travelEndDate}
          </Text>
          <Text color="gray" size={"2"} as="p">
            服务承接：{travelService.travelAgency}
          </Text>
          <Text color="gray" size={"2"} as="p">
            疗休养地：{travelService.travelDestination}
          </Text>
        </Box>
        <Box mr={"3"}>
          <ScoreBadge score={score} />
        </Box>
      </Flex>
    </>
  );
};

export default RatingHeader;
