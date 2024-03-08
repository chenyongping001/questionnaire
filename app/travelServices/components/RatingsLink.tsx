import { Flex, Link } from "@radix-ui/themes";
import AvarageScoreBadge from "../[id]/ratings/components/AvarageScoreBadge";

interface Props {
  travelServiceId: number;
}
const RatingsLink = ({ travelServiceId }: Props) => {
  return (
    <Flex justify={"between"} align={"center"} mr={"3"}>
      <AvarageScoreBadge travelServiceId={travelServiceId} />
      <Link href={`/travelServices/${travelServiceId}/ratings`}>评价列表</Link>
    </Flex>
  );
};

export default RatingsLink;
