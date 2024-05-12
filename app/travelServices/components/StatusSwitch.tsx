"use client";
import { Prisma, TravelService, TravelServiceStatus } from "@prisma/client";
import { AlertDialog, Box, Button, Flex, Switch, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { sendMessage } from "@/app/actions";

interface Props {
  travelService: TravelService;
}
const StatusSwitch = ({ travelService }: Props) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(
    travelService.status === TravelServiceStatus.RATING
  );
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isChanging, setChanging] = useState(false);
  let submitData: FieldValues = {
    title: travelService.title,
    description: travelService.description,
    travelAgency: travelService.travelAgency,
    travelDestination: travelService.travelDestination,
    travelStartDate: travelService.travelStartDate,
    travelEndDate: travelService.travelEndDate,
  };
  const ChangeStatusOfTravelService = async (status: TravelServiceStatus) => {
    try {
      setChanging(true);
      submitData = {
        ...submitData,
        status: status,
      };
      await axios.patch("/api/travelServices/" + travelService.id, submitData);
      setChanging(false);
      setOpen(false);
      router.push(`/travelServices/${travelService.id}`);
      router.refresh();
    } catch (error) {
      setChanging(false);
      setOpen(false);
      setError(true);
    }
  };
  return (
    <Box my="3">
      <Flex gap="2">
        <Switch
          checked={checked}
          disabled={isChanging}
          radius="small"
          size={"3"}
          onCheckedChange={(isChecked) => {
            setChecked(isChecked);
            if (isChecked && travelService.status === TravelServiceStatus.DRAFT)
              setOpen(true);
            else ChangeStatusOfTravelService(isChecked ? "RATING" : "ENDED");
          }}
        />{" "}
        开启评价{isChanging && <Spinner />}
      </Flex>

      <AlertDialog.Root open={open}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>开启评价</AlertDialog.Title>
          <AlertDialog.Description size="2">
            开启评价允许参与者进行评价，同时您将不能再修改疗休养的信息。您确认要开启评价吗?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setOpen(false);
                  setChecked(false);
                }}
              >
                取消
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => {
                  ChangeStatusOfTravelService("RATING");
                  const users = travelService.ratingUsers
                    .split(",")
                    .map((user) => user.split("|")[0])
                    .join("|");
                  const message = `疗休养评价：<a href="https://questionnaire.td.masterpeak.cn/travelServices/${travelService.id}">请您对本次${travelService.travelDestination}的疗休养进行评价!</a>`;
                  sendMessage(message, users);
                }}
              >
                开启评价
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>错误</AlertDialog.Title>
          <AlertDialog.Description>
            疗休养状态未能改变！
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="3"
            onClick={() => {
              setError(false);
            }}
          >
            确定
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
};

export default StatusSwitch;
