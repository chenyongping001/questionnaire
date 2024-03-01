import prisma from "@/prisma/client";

export const getTravelService = async (id: string) => {
  const travelService = await prisma.travelService.findUnique({
    where: { id: parseInt(id) },
    include: { UserRatingOfTracelService: true },
  });
  if (!travelService) return null;
  return travelService;
};
