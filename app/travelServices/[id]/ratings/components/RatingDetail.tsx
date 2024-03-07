"use client";
import React from "react";
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  RadioGroup,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import RatingHeader, {
  TravelServiceWithIncludes,
} from "../components/RatingHeader";
import { Prisma } from "@prisma/client";
import { includeOfUserRatings } from "../getUserRatings";
import { convertDateToString } from "@/app/utilities/trimTime";
import ScoreBadge from "./ScoreBadge";

const UserRatingWithIncludes =
  Prisma.validator<Prisma.UserRatingOfTravelServiceDefaultArgs>()({
    include: includeOfUserRatings,
  });
interface Props {
  travelService: Prisma.TravelServiceGetPayload<
    typeof TravelServiceWithIncludes
  >;
  userRating: Prisma.UserRatingOfTravelServiceGetPayload<
    typeof UserRatingWithIncludes
  >;
}
const RatingDetail = ({ travelService, userRating }: Props) => {
  return (
    <Flex direction={"column"} gap={"3"} className="max-w-xl">
      <Heading as="h2">{travelService.title}</Heading>
      <Flex
        align={"center"}
        justify={"between"}
        style={{
          background: "var(--gray-a2)",
        }}
        p="4"
        gap={"3"}
      >
        <ScoreBadge score={userRating.score} />
        <Box>
          <Heading mb="1" size="2">
            {userRating.ratingBy.substring(6)}
          </Heading>
          <Text color="gray">{convertDateToString(userRating.ratingAt)}</Text>
        </Box>
      </Flex>
      {travelService.ratingTemplate.ratingItems.map((ratingItemsOnTemplate) => (
        <Card key={ratingItemsOnTemplate.id}>
          <Text size="3">
            {ratingItemsOnTemplate.ratingItem.title}
            <Separator my="3" size="4" />
            <RadioGroup.Root
              disabled
              value={`${
                userRating.ratingDetails.find(
                  (detail) =>
                    detail.valuesOnRatingItems.ratingItemId ===
                    ratingItemsOnTemplate.ratingItemId
                )?.valuesOnRatingItemsId
              }`}
            >
              {ratingItemsOnTemplate.ratingItem.ratingValues.map(
                (valuesOnRatingItem) => (
                  <Flex direction={"column"} key={valuesOnRatingItem.id}>
                    <Text as="label" my={"1"}>
                      <Flex gap="3">
                        <RadioGroup.Item value={`${valuesOnRatingItem.id}`} />
                        {valuesOnRatingItem.ratingValue.title}
                      </Flex>
                    </Text>
                  </Flex>
                )
              )}
            </RadioGroup.Root>
          </Text>
        </Card>
      ))}
      {travelService.ratingTemplate.remarkItems.map((remarkItemsOnTemplate) => (
        <Card key={remarkItemsOnTemplate.id}>
          <Text size={"3"}>{remarkItemsOnTemplate.remarkItem.title}</Text>
          <TextArea
            disabled
            className="h-36 my-3"
            size={"3"}
            value={`${
              userRating.remarkDetails.find(
                (detail) =>
                  detail.remarkItemId === remarkItemsOnTemplate.remarkItemId
              )?.remarkContent
            }`}
          />
        </Card>
      ))}
    </Flex>
  );
};

export default RatingDetail;
