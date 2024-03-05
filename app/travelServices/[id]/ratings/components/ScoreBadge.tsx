import { Badge, Text } from "@radix-ui/themes";

interface Props {
  score: number;
}

const ScoreBadge = ({ score }: Props) => {
  return (
    <Badge
      radius="full"
      size={"2"}
      color={score < 80 ? "red" : score >= 95 ? "green" : "gold"}
    >
      <Text size="7" weight="bold">
        {score}
      </Text>
    </Badge>
  );
};

export default ScoreBadge;
