import prisma from "@/prisma/client";
import { Session } from "next-auth";

export const includeOfUserRatings = {
      ratingDetails:{
        include:{
          valuesOnRatingItems:{
            include:{
              ratingItem:true,
              ratingValue:true,
            }
          },
        },
      },
      remarkDetails:{
        include:{
          remarkItem:true,
        },
      }
    };

export const getUserRatings = async (travelServiceId: number, session: Session) => {
  const userRatings = await prisma.userRatingOfTravelService.findMany({
    where: { travelServiceId: travelServiceId},
    orderBy: {
      ratingAt: "desc",
    },
    include: includeOfUserRatings,
  });

  if (
    session?.user?.role !== "ADMIN" &&
    !userRatings.some(rating=>rating.ratingBy===`${session?.user?.ygdm!}|${session?.user?.ygmc!}`)
  )
    return null;
  
  return userRatings;
};

export const getUserRating = async (userRatingId: number) => {
  const userRating = await prisma.userRatingOfTravelService.findUnique({
    where:{
      id:userRatingId
    },
    include: includeOfUserRatings,
  });
  return userRating;
};