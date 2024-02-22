import { Avatar, Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { MdAttachFile } from "react-icons/md";

interface Props {
  ygdm: string;
  ygmc: string;
  onMinus: () => void;
}

const RatingUserItem = ({ ygdm, ygmc, onMinus }: Props) => {
  return (
    <Card size="1" className="px-2">
      <Grid columns={"3"} gap={"1"}>
        <Flex gap="3" align="center" className="col-span-2">
          {/* <Avatar
            size="4"
            radius="full"
            fallback=<MdAttachFile />
            color="indigo"
          /> */}
          <Box>
            <Text as="div" size="1" weight="bold">
              {ygmc}
            </Text>

            <Text as="div" size="1" color="gray">
              {ygdm}
            </Text>
          </Box>
        </Flex>
        <Flex className="items-center">
          <Button
            color="red"
            variant="soft"
            className="align-middle h-full"
            onClick={onMinus}
          >
            <Text className="text-xl" weight={"bold"}>
              -
            </Text>
          </Button>
        </Flex>
      </Grid>
    </Card>
  );
};

export default RatingUserItem;
