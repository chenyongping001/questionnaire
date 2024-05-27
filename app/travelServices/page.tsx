import prisma from "@/prisma/client";
import { TravelServiceStatus } from "@prisma/client";
import { Flex, Heading, Link, Table, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import TravelServiceStatusBadge from "../components/TravelServiceStatusBadge";
import AvarageScoreBadge from "./[id]/ratings/components/AvarageScoreBadge";
import ExportExcelLink from "./components/ExportExcelLink";
import TravelServiceActions from "./components/TravelServiceActions";
import { convertDateToString, keep2Dec } from "../utilities/trimTime";

const TravelServicesPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session!.user!;

  const travelServices = await prisma.travelService.findMany({
    where: {
      ratingUsers:
        user.role === "ADMIN"
          ? undefined
          : { contains: `${user.ygdm}|${user.ygmc}` },
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      UserRatingOfTracelService: true,
    },
  });

  const columns = [
    { key: "id", header: "序号", width: 10 },
    { key: "title", header: "标题", width: 30 },
    { key: "travelAgency", header: "旅行社", width: 20 },
    { key: "travelDestination", header: "地点", width: 20 },
    { key: "travelStartDate", header: "开始日期", width: 15 },
    { key: "travelEndDate", header: "结束日期", width: 15 },
    { key: "createBy", header: "创建人", width: 15 },
    { key: "createAt", header: "创建时间", width: 20 },
    { key: "ratingUsers", header: "参团人员及评分", width: 50 },
    { key: "avarageScore", header: "平均评分", width: 10 },
    { key: "description", header: "说明", width: 50 },
  ];

  const rows = travelServices.map((travel) => ({
    ...travel,
    createBy: travel.createBy.split("|")[1],
    createAt: convertDateToString(travel.createAt),
    ratingUsers: travel.ratingUsers
      .split(",")
      .map(
        (user) =>
          `${user.split("|")[1]}${
            travel.UserRatingOfTracelService.find(
              (rating) => rating.ratingBy === user
            )?.score ?? ""
          }`
      )
      .join(","),
    avarageScore: travel.UserRatingOfTracelService.length
      ? keep2Dec(
          travel.UserRatingOfTracelService.reduce(
            (prev, cur) => prev + cur.score,
            0
          ) / travel.UserRatingOfTracelService.length
        )
      : "",
  }));

  return (
    <div>
      <Flex align={"end"} justify={"between"} mb={"2"}>
        {user.role === "ADMIN" && <TravelServiceActions />}
        {user.role !== "ADMIN" && (
          <Heading size={"3"} color="gray">
            疗休养批次列表
          </Heading>
        )}
        {rows.length > 0 && user.role === "ADMIN" && (
          <ExportExcelLink headers={columns} rows={rows} />
        )}
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>名称</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              旅行社
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              地点
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              开始日期
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              结束日期
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>状态</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              得分
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {travelServices.map((travelService) => (
            <Table.Row key={travelService.id} align={"center"}>
              <Table.Cell>
                <Link href={`/travelServices/${travelService.id}`}>
                  <Text as="p">{travelService.title}</Text>
                  <div className="block md:hidden text-gray-400 mt-1 text-xs">
                    起止日期：{travelService.travelStartDate}至
                    {travelService.travelEndDate}
                  </div>
                  <div className="block md:hidden text-gray-400 text-xs">
                    服务承接：{travelService.travelAgency}
                  </div>
                  <div className="block md:hidden text-gray-400 text-xs">
                    疗休养地：{travelService.travelDestination}
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {travelService.travelAgency}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {travelService.travelDestination}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {travelService.travelStartDate}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {travelService.travelEndDate}
              </Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap={"2"}>
                  <div>
                    <TravelServiceStatusBadge status={travelService.status} />
                  </div>
                  <div className="block md:hidden text-gray-400 text-xs ">
                    {travelService.status !== TravelServiceStatus.DRAFT && (
                      <Link
                        href={`/travelServices/${travelService.id}/ratings`}
                      >
                        <AvarageScoreBadge
                          travelServiceId={travelService.id}
                          badgeSize="1"
                          textSize="2"
                        />
                      </Link>
                    )}
                  </div>
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {travelService.status !== TravelServiceStatus.DRAFT && (
                  <Link href={`/travelServices/${travelService.id}/ratings`}>
                    <AvarageScoreBadge
                      travelServiceId={travelService.id}
                      badgeSize="1"
                      textSize="2"
                    />
                  </Link>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "疗休养批次列表",
  description: "疗休养批次列表",
};
export default TravelServicesPage;
