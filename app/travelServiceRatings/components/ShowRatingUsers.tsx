import { Box, Card, Grid, Text } from "@radix-ui/themes";

interface Props {
  ratingUsers: string;
}

const ShowRatingUsers = ({ ratingUsers }: Props) => {
  const users = ratingUsers.split(",");
  return (
    <Grid gap="1" columns="3">
      {users.map((user) => (
        <Card>
          <Box>
            <Text as="div" size="1" weight="bold">
              {user.split("|")[1]}
            </Text>

            <Text as="div" size="1" color="gray">
              {user.split("|")[0]}
            </Text>
          </Box>
        </Card>
      ))}
    </Grid>
  );
};

export default ShowRatingUsers;
