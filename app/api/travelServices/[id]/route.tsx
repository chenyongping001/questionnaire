import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { checkError } from "../checkError";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { getTravelService } from "@/app/travelServices/[id]/getTravelService";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService)
    return NextResponse.json({ error: "不正确的疗休养单" }, { status: 404 });

  const body = await request.json();
  const error = await checkError(body);
  if (error) return NextResponse.json(error, { status: 400 });

  const updatedTravelService = await prisma.travelService.update({
    where: { id: parseInt(params.id) },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedTravelService);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService)
    return NextResponse.json({ error: "不正确的疗休养单" }, { status: 404 });

  await prisma.travelService.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({});
}
