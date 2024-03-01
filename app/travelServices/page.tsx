import { Button, Table, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import TravelServiceActions from "./components/TravelServiceActions";
import TravelServiceStatusBadge from "../components/TravelServiceStatusBadge";

const TravelServicesPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session!.user!;

  const travelServices = await prisma.travelService.findMany({
    where: {
      ratingUsers: user.role === "ADMIN" ? undefined : { contains: user.ygdm },
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
      <TravelServiceActions />
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {travelServices.map((travelService) => (
            <Table.Row key={travelService.id}>
              <Table.Cell>
                <Link href={`/travelServices/${travelService.id}`}>
                  {travelService.title}
                </Link>
                <div className="block md:hidden text-gray-500 mt-1 text-xs">
                  {travelService.travelDestination}
                </div>
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
                <TravelServiceStatusBadge status={travelService.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TravelServicesPage;
