import { Badge, Text } from "@radix-ui/themes";

interface Props {
  score: number;
  badgeSize?: "1" | "2";
  textSize?: "1" | "3" | "2" | "7";
}

const ScoreBadge = ({ score, badgeSize = "2", textSize = "7" }: Props) => {
  return (
    <Badge
      radius="full"
      size={badgeSize}
      color={score < 80 ? "red" : score >= 95 ? "green" : "gold"}
    >
      <Text size={textSize} weight="bold">
        {score}
      </Text>
    </Badge>
  );
};

export default ScoreBadge;
