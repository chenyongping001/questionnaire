import { z } from "zod";

export const travelServiceSchema = z.object({
  title: z
    .string({ required_error: "请输入疗休养服务综合评分表标题" })
    .min(10, "疗休养服务综合评分表标题太短"),
  description: z.string().min(1, "请输入疗休养服务综合评分表说明").max(255),
  ratingUsers: z.string().min(5, "未设置允许评分的职工"),
  travelAgency: z.string().min(1, "请输入旅行社名称").max(255),
  travelDestination: z.string().min(1, "请输入疗休养目的地").max(255),
  travelStartDate: z.coerce.date(),
  travelEndDate: z.coerce.date(),
  // createBy: z.string().length(5, "创建人不正确"),
  // ratingTemplateId: z.coerce.number().int().positive(),
});
