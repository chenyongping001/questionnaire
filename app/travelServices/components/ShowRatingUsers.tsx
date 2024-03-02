import { Box, Card, Grid, Text } from "@radix-ui/themes";
import { RatingUser } from "./SelectedRatingUsers";

interface Props {
  ratingUsers: RatingUser[];
}

const ShowRatingUsers = ({ ratingUsers }: Props) => {
  return (
    <Grid gap="1" columns="3">
      {ratingUsers.map((user) => (
        <Card key={user.ygdm}>
          <Box>
            <Text as="div" size="1" weight="bold">
              {user.ygmc}
            </Text>

            <Text as="div" size="1" color="gray">
              {user.ygdm}
            </Text>
          </Box>
        </Card>
      ))}
    </Grid>
  );
};

export default ShowRatingUsers;
