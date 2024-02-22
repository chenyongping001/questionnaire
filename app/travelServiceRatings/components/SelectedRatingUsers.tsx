"use client";
import { Flex, Grid, Text } from "@radix-ui/themes";
import RatingUserItem from "./RatingUserItem";

export type RatingUser = {
  ygdm: string;
  ygmc: string;
};

interface Props {
  selectedRatingUsers: RatingUser[];
  onSelectedUser: (user: RatingUser) => void;
  onUnselectUser: (user: RatingUser) => void;
}

const SelectedRatingUsers = ({
  selectedRatingUsers,
  onSelectedUser,
  onUnselectUser,
}: Props) => {
  return (
    <Grid gap="1" columns="3">
      {selectedRatingUsers.map((user) => (
        <RatingUserItem
          key={user.ygdm}
          ygdm={user.ygdm}
          ygmc={user.ygmc}
          onMinus={() => onUnselectUser(user)}
        />
      ))}

      <label className="flex justify-center items-center bg-slate-200 label-input">
        <input
          type="button"
          hidden
          onClick={() => onSelectedUser({ ygdm: "96143", ygmc: "陈永平" })}
        />
        <Text className="text-2xl" weight={"bold"} color="indigo">
          +
        </Text>
      </label>
    </Grid>
  );
};

export default SelectedRatingUsers;
