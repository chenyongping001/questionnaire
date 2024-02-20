import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { checkError } from "./checkError";

export async function POST(request: NextRequest) {
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
