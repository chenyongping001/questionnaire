import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { getTravelService } from "../../getTravelService";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
const NewRatingPage = async ({ params }: Props) => {
  // 获取参数id,再获得疗休养单，
  // 显示一些必须的信息，如标题，说明，旅行社，目的地，起止日期。
  // 从疗休养单知道模板ID，获取模板连带评价条目清单。
  // 显示评价条目清单。
  // 显示每条评价条目的备选答案。
  const session = await getServerSession(authOptions);
  const travelService = await getTravelService(params.id, session!);
  if (!travelService) notFound();
  return (
    <div>
      <ul>
        <li>{travelService.title}</li>
        <li>{travelService.description}</li>
        <li>{travelService.travelAgency}</li>
        <li>{travelService.travelStartDate}</li>
        <li>{travelService.travelEndDate}</li>
        <li>{travelService.ratingTemplate.id}</li>
        <li>{travelService.ratingTemplate.name}</li>
        <li>
          <ul>
            {travelService.ratingTemplate.ratingItems.map((ratingItem) => (
              <li key={ratingItem.id}>
                {ratingItem.ratingItem.title}
                <ul>
                  {ratingItem.ratingItem.ratingValues.map((ratingValue) => (
                    <li>
                      {ratingValue.ratingValue.title}
                      {ratingValue.ratingValue.value}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NewRatingPage;
