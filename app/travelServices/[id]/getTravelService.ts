import prisma from "@/prisma/client";
import { Session } from "next-auth";

export const getTravelService = async (id: string, session: Session) => {
  const travelService = await prisma.travelService.findUnique({
    where: { id: parseInt(id) },
    include: { UserRatingOfTracelService: true },
  });
  if (!travelService) return null;
  if (
    session?.user?.role !== "ADMIN" &&
    !travelService.ratingUsers.includes(session?.user?.ygdm!)
  )
    return null;
  return travelService;
};
