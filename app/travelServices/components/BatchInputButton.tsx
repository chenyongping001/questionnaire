"use client";

import { AlertDialog, Button, Flex, TextArea } from "@radix-ui/themes";
import { useState } from "react";

interface Props {
  onBatchUsersInput: (users: string) => void;
}

const BatchInputButton = ({ onBatchUsersInput }: Props) => {
  const [users, setUsers] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" type="button" onClick={() => setOpen(true)}>
        批量添加
      </Button>

      <AlertDialog.Root open={open}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>批量输入疗休养职工</AlertDialog.Title>
          <AlertDialog.Description size="3" mb="4">
            请输入参与本次疗休养职工的工号，以英文逗号分隔
          </AlertDialog.Description>
          <TextArea
            size={"3"}
            className="h-28"
            placeholder="格式示例：01001,97111,15011"
            value={users}
            onChange={(event) => setUsers(event.target.value)}
          />

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              onClick={() => {
                closeDialog();
              }}
            >
              取消
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                onBatchUsersInput(users);
                // console.log(users);
                closeDialog();
              }}
            >
              添加
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
  function closeDialog() {
    setOpen(false);
    setUsers("");
  }
};

export default BatchInputButton;
