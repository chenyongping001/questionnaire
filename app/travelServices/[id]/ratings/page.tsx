import React, { useState } from "react";
import { getTravelService } from "../getTravelService";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { Flex, Heading, Link, Table } from "@radix-ui/themes";
import RatingHeader from "./components/RatingHeader";
import { getUserRatings } from "./getUserRatings";
import { convertDateToString, keep2Dec } from "@/app/utilities/trimTime";
import ScoreBadge from "./components/ScoreBadge";
import ShowRatingUsers from "../../components/ShowRatingUsers";
import { formatToRatingUser } from "../../components/formatToRatingUser";

interface Props {
  params: { id: string };
}
const RatingsPage = async ({ params }: Props) => {
  // 获取疗休养批次情况，
  // 头部仿照ratingForm展示，分数是平均分，分数分颜色显示。
  // 显示评分列表：评分人，分数，评价时间，分数分颜色显示。链接可以查看评分详情
  // 显示未评分的人员清单。

  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();

  const userRatings = await getUserRatings(travelService.id, session!);
  if (!userRatings) notFound();

  const length = userRatings.length;
  const avarageScore = length
    ? keep2Dec(
        userRatings.reduce((prev, cur) => (prev + cur.score) / length, 0)
      )
    : 0;

  return (
    <Flex direction={"column"} gap={"3"} className="max-w-xl">
      <RatingHeader travelService={travelService} score={avarageScore} />
      <Heading size={"3"} color="gray" className="pt-3 px-3">
        用户评价详情
      </Heading>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>评价人</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>评价时间</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>分数</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userRatings.map((userRating) => (
            <Table.Row key={userRating.id}>
              <Table.Cell>
                <Link
                  href={`/travelServices/${userRating.travelServiceId}/ratings/${userRating.id}`}
                >
                  {userRating.ratingBy.split("|")[1]}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {convertDateToString(userRating.ratingAt)}
              </Table.Cell>
              <Table.Cell>
                <ScoreBadge
                  score={userRating.score}
                  badgeSize="1"
                  textSize="2"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Heading size={"3"} color="gray" className="pt-3 px-3">
        未评价用户
      </Heading>
      <ShowRatingUsers
        ratingUsers={formatToRatingUser(
          travelService.ratingUsers
            .split(",")
            .filter(
              (ratingUser) =>
                !userRatings.map((user) => user.ratingBy).includes(ratingUser)
            )
            .join(",")
        )}
      />
    </Flex>
  );
};

export default RatingsPage;
