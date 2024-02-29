import { TravelServiceStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: TravelServiceStatus;
}

const statusMap: Record<
  TravelServiceStatus,
  { label: string; color: "gold" | "indigo" | "green" | "red" }
> = {
  DRAFT: { label: "草稿", color: "gold" },
  RATING: { label: "投票中", color: "green" },
  ENDED: { label: "已结束", color: "red" },
};

const TravelServiceStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default TravelServiceStatusBadge;
