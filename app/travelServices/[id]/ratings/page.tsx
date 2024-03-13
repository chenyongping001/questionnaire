import React, { useState } from "react";
import { getTravelService } from "../getTravelService";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { Flex, Heading, Link, Table, Text } from "@radix-ui/themes";
import RatingHeader from "./components/RatingHeader";
import { getUserRatings } from "./getUserRatings";
import { convertDateToString, keep2Dec } from "@/app/utilities/trimTime";
import ScoreBadge from "./components/ScoreBadge";
import ShowRatingUsers from "../../components/ShowRatingUsers";
import { formatToRatingUser } from "../../components/formatToRatingUser";
import { Metadata } from "next";

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
  if (!userRatings) return <p>请您先评分！</p>;

  const length = userRatings.length;
  const avarageScore = length
    ? keep2Dec(userRatings.reduce((prev, cur) => prev + cur.score, 0) / length)
    : 0;

  const showUserRatings =
    session?.user?.role === "ADMIN"
      ? userRatings
      : userRatings.filter(
          (userRating) =>
            userRating.ratingBy ===
            `${session?.user?.ygdm}|${session?.user?.ygmc}`
        );

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
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              评价时间
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              意见
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>分数</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {showUserRatings.map((userRating) => (
            <Table.Row key={userRating.id}>
              <Table.Cell>
                <Link
                  href={`/travelServices/${userRating.travelServiceId}/ratings/${userRating.id}`}
                >
                  <Text as="p">{userRating.ratingBy.split("|")[1]}</Text>
                  <div className="block md:hidden text-gray-800 mt-1 text-sm">
                    <ul>
                      {userRating.remarkDetails.map((remarkDetail) => (
                        <li key={remarkDetail.id}>
                          {remarkDetail.remarkContent}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="block md:hidden text-gray-400 text-xs">
                    {convertDateToString(userRating.ratingAt)}
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {convertDateToString(userRating.ratingAt)}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ul>
                  {userRating.remarkDetails.map((remarkDetail) => (
                    <li key={remarkDetail.id}>{remarkDetail.remarkContent}</li>
                  ))}
                </ul>
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

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "评分情况列表",
  description: "疗休养参与者评分情况列表",
};
export default RatingsPage;
