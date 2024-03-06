import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getUserRatings } from "@/app/travelServices/[id]/ratings/getUserRatings";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  const userRatings = await getUserRatings(parseInt(params.id), session!);
  return NextResponse.json(userRatings);
}

export async function POST(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  const travelService = await prisma.travelService.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (
    !travelService ||
    !travelService.ratingUsers.includes(
      `${session?.user?.ygdm!}|${session?.user?.ygmc!}`
    )
  )
    return NextResponse.json({ error: "您未参加本次疗休养，不能评价" });

  const userRating = await prisma.userRatingOfTravelService.findFirst({
    where: {
      travelServiceId: parseInt(params.id),
      ratingBy: {
        contains: session?.user?.ygdm!,
      },
    },
  });
  if (userRating) return NextResponse.json({ error: "您已评分，不能重复评价" });

  const body = await request.json();
  const fields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === "UserRatingOfTravelService")
    ?.fields.map((field) => field.name);
  for (let key of Object.keys(body)) {
    if (!fields?.includes(key))
      return NextResponse.json({ error: `错误的属性：${key}` });
  }

  // 判断用户否是疗休养用户
  // 判断用户是否已评过分

  const newRatingOfTravelService =
    await prisma.userRatingOfTravelService.create({
      data: {
        ...body,
      },
    });
  return NextResponse.json(newRatingOfTravelService, { status: 201 });
}
