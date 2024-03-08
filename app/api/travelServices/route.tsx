import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { checkError } from "./checkError";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN")
    return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const error = await checkError(body);
  if (error) return NextResponse.json(error, { status: 400 });

  const newTracelService = await prisma.travelService.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json(newTracelService, { status: 201 });
}
