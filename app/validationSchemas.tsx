import { z } from "zod";
import { regexDate } from "./utilities/customValidation";

export const travelServiceSchema = z.object({
  title: z
    .string({ required_error: "请输入疗休养服务综合评分表标题" })
    .min(10, "疗休养服务综合评分表标题太短"),
  description: z.string().min(1, "请输入疗休养服务综合评分表说明").max(255),
  // ratingUsers: z.string().min(5, "未设置允许评分的职工"),
  travelAgency: z.string().min(1, "请输入旅行社名称").max(255),
  travelDestination: z.string().min(1, "请输入疗休养目的地").max(255),
  travelStartDate: z
    .string()
    .min(1, "请输入开始日期")
    .regex(regexDate, "日期格式不正确")
    .max(11),
  travelEndDate: z
    .string()
    .min(1, "请输入结束日期")
    .regex(regexDate, "日期格式不正确")
    .max(11),
  createBy: z.string().optional(),
  // ratingTemplateId: z.coerce.number().int().positive(),
});
