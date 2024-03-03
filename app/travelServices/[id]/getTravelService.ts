import prisma from "@/prisma/client";
import { Session } from "next-auth";

export const includeOfTravelService = {
      ratingTemplate:{
        include:{
          ratingItems:{
            include:{
              ratingItem:{
                include:{
                  ratingValues:{
                    include:{
                      ratingValue:true
                    }
                  }
                }
              }
            }
          },
          remarkItems:{
            include:{
              remarkItem:true
            }
          }
        }
      }
    };

export const getTravelService = async (id: string, session: Session) => {
  const travelService = await prisma.travelService.findUnique({
    where: { id: parseInt(id) },
    include: includeOfTravelService,
  });
  if (!travelService) return null;
  if (
    session?.user?.role !== "ADMIN" &&
    !travelService.ratingUsers.includes(session?.user?.ygdm!)
  )
    return null;
  return travelService;
};
