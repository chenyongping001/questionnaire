import prisma from "@/prisma/client";
import { Flex, Heading, Link, Table, Text } from "@radix-ui/themes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import TravelServiceStatusBadge from "../components/TravelServiceStatusBadge";
import AvarageScoreBadge from "./[id]/ratings/components/AvarageScoreBadge";
import TravelServiceActions from "./components/TravelServiceActions";
import { Metadata } from "next";
import { TravelServiceStatus } from "@prisma/client";

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

  return (
    <div>
      {user.role === "ADMIN" && <TravelServiceActions />}
      {user.role !== "ADMIN" && (
        <Heading size={"3"} color="gray" className="pb-3">
          疗休养批次列表
        </Heading>
      )}

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
            <Table.Row key={travelService.id}>
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
              <Table.Cell align="center">
                <Flex direction="column" gap={"2"}>
                  <TravelServiceStatusBadge status={travelService.status} />
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
