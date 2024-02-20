import { travelServiceSchema } from "@/app/validationSchemas";
import { Prisma } from "@prisma/client";

export async function checkError(body: any) {
  const fields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === "TravelService")
    ?.fields.map((field) => field.name);
  for (let key of Object.keys(body)) {
    if (!fields?.includes(key)) return { error: `错误的属性：${key}` };
  }

  const validation = travelServiceSchema.safeParse(body);
  if (!validation.success) return validation.error.format();
  return null;
}