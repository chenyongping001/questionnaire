"use client";
import { Prisma } from "@prisma/client";
import {
  Box,
  Card,
  Flex,
  Heading,
  RadioGroup,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { includeOfTravelService } from "../../getTravelService";

const TravelServiceWithIncludes =
  Prisma.validator<Prisma.TravelServiceDefaultArgs>()({
    include: includeOfTravelService,
  });
const RatingTravelServiceForm = ({
  travelService,
}: {
  travelService: Prisma.TravelServiceGetPayload<
    typeof TravelServiceWithIncludes
  >;
}) => {
  return (
    <div>
      <Heading as="h2">{travelService.title}</Heading>
      <Box my={"3"}>
        <Text color="gray" size={"2"} as="p">
          服务承接：{travelService.travelAgency}
        </Text>
        <Text color="gray" size={"2"}>
          起止日期：{travelService.travelStartDate}--
          {travelService.travelEndDate}
        </Text>
      </Box>
      <Box
        style={{
          background: "var(--gray-a2)",
        }}
        p="4"
        my={"4"}
      >
        <Text>{travelService.description}</Text>
      </Box>
      {travelService.ratingTemplate.ratingItems.map(({ ratingItem }) => (
        <Card my={"3"} key={ratingItem.id}>
          <Text size="3">
            {ratingItem.title}
            <Separator my="3" size="4" />
            <RadioGroup.Root>
              {ratingItem.ratingValues.map(({ ratingValue }) => (
                <Flex direction={"column"} key={ratingValue.id}>
                  <Text as="label" my={"1"}>
                    <Flex gap="3">
                      <RadioGroup.Item value={`${ratingValue.value}`} />
                      {ratingValue.title}
                    </Flex>
                  </Text>
                </Flex>
              ))}
            </RadioGroup.Root>
          </Text>
        </Card>
      ))}
      {travelService.ratingTemplate.remarkItems.map(({ remarkItem }) => (
        <Card my={"3"} key={remarkItem.id}>
          <Text size="3">
            {remarkItem.title}
            <Separator my="3" size="4" />
            <TextArea className="h-28" placeholder={remarkItem.description} />
          </Text>
        </Card>
      ))}
    </div>
  );
};

export default RatingTravelServiceForm;
