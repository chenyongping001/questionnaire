"use client";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Text,
  TextField,
} from "@radix-ui/themes";
import RatingUserItem from "./RatingUserItem";
import SearchSelect, { SelectItem } from "./SearchSelect";

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
      <Box>
        <Dialog.Root>
          <Dialog.Trigger>
            {/* <Button
                variant="soft"
                style={{ width: "100%", height: "100%" }}
                radius="large"
              >
                <Text className="text-xl" weight={"bold"} color="indigo" >
                  +
                </Text>
              </Button> */}
            <button
              type="button"
              className="h-full w-full text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              +
            </button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>添加疗休养人员</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              只允许添加正式职工。搜索并选择名字进行添加，可以不关闭当前对话框重复添加。
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <SearchSelect
                  endpoint="/api/mis/employees"
                  minChar={2}
                  size="3"
                  searchPlaceHolder="疗休养人员姓名"
                  onItemSelect={(item?: SelectItem) =>
                    item &&
                    onSelectedUser({ ygdm: item.value, ygmc: item.label })
                  }
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
                >
                  关闭
                </button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </Grid>
  );
};

export default SelectedRatingUsers;
