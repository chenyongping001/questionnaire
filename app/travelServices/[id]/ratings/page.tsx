import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { convertDateToString, keep2Dec } from "@/app/utilities/trimTime";
import { Flex, Heading, Link, Table, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ExportExcelLink from "../../components/ExportExcelLink";
import ShowRatingUsers from "../../components/ShowRatingUsers";
import { formatToRatingUser } from "../../components/formatToRatingUser";
import { getTravelService } from "../getTravelService";
import RatingHeader from "./components/RatingHeader";
import ScoreBadge from "./components/ScoreBadge";
import { getUserRatings } from "./getUserRatings";

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

  const columns = [
    { key: "ratingBy", header: "评价人", width: 10 },
    { key: "ratingAt", header: "评价时间", width: 20 },
    { key: "remarkDetails", header: "意见", width: 50 },
    { key: "score", header: "分数", width: 10 },
  ];
  const rows = showUserRatings.map((userRating) => ({
    id: userRating.id,
    travelServiceId: userRating.travelServiceId,
    ratingBy: userRating.ratingBy.split("|")[1],
    ratingAt: convertDateToString(userRating.ratingAt),
    remarkDetails: userRating.remarkDetails
      .map((detail) => detail.remarkContent)
      .join(";"),
    score: userRating.score,
  }));

  return (
    <Flex direction={"column"} gap={"3"} className="max-w-xl">
      <RatingHeader travelService={travelService} score={avarageScore} />
      <Flex align={"end"} justify={"between"}>
        <Heading size={"3"} color="gray" className="pt-3 px-3">
          用户评价详情
        </Heading>
        <ExportExcelLink headers={columns} rows={rows} />
      </Flex>
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
          {rows.map((row) => (
            <Table.Row key={row.id} align={"center"}>
              <Table.Cell>
                <Link
                  href={`/travelServices/${row.travelServiceId}/ratings/${row.id}`}
                >
                  <Text as="p">{row.ratingBy}</Text>
                  <div className="block md:hidden text-gray-800 mt-1 text-sm">
                    {row.remarkDetails}
                  </div>
                  <div className="block md:hidden text-gray-400 text-xs">
                    {row.ratingAt}
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {row.ratingAt}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {row.remarkDetails}
              </Table.Cell>

              <Table.Cell>
                <ScoreBadge score={row.score} badgeSize="1" textSize="2" />
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
