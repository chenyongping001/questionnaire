"use client";
import { Prisma } from "@prisma/client";
import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  RadioGroup,
  Separator,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { includeOfTravelService } from "../../getTravelService";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
import ScoreBadge from "./ScoreBadge";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";

const TravelServiceWithIncludes =
  Prisma.validator<Prisma.TravelServiceDefaultArgs>()({
    include: includeOfTravelService,
  });
const RatingTravelServiceForm = ({
  travelService,
  ratingUser,
}: {
  travelService: Prisma.TravelServiceGetPayload<
    typeof TravelServiceWithIncludes
  >;
  ratingUser: string;
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // 添加状态：总分，评分数组，备注数组，
  // 添加变量，评分选项个数，计
  const router = useRouter();
  const [ratingItemValues, setRatingItemValues] = useState(
    travelService.ratingTemplate.ratingItems.map((ratingItemOnTemplate) => ({
      ratingItemOnTemplate: ratingItemOnTemplate.id,
      valuesOnRatingItem: 0,
      value: 0,
    }))
  );
  const [remarks, setRemarks] = useState(
    travelService.ratingTemplate.remarkItems.map((remarkItemOnTemplate) => ({
      remarkItemOnTemplate: remarkItemOnTemplate.id,
      remarkItem: remarkItemOnTemplate.remarkItemId,
      remarkContent: "",
    }))
  );

  const rateTotal = ratingItemValues.reduce((prev, cur) => {
    return prev + cur.value;
  }, 0);

  const handleRating = async () => {
    // 检查选项是否全选中，否则返回。
    // 获取user.
    // 进行创建条目

    if (ratingItemValues.some((item) => item.value === 0)) {
      showError("分数未打全，请您再检查一下！");
      return;
    }

    if (!travelService.ratingUsers.includes(ratingUser)) {
      showError("您不是本次疗休养参与者，不能进行打分！");
      return;
    }

    setSubmitting(true);

    let submitData = {
      travelServiceId: travelService.id,
      ratingBy: ratingUser,
      score: rateTotal,
      ratingDetails: {
        create: ratingItemValues.map((item) => ({
          valuesOnRatingItemsId: item.valuesOnRatingItem,
        })),
      },
      remarkDetails: {
        create: remarks.map((item) => ({
          remarkItemId: item.remarkItem,
          remarkContent: item.remarkContent,
        })),
      },
    };

    axios
      .post(`/api/travelServices/${travelService.id}/ratings/`, submitData)
      .then((res) => {
        if (res.status === 201) {
          router.push(`/travelServices/${travelService.id}/ratings`);
          router.refresh();
        }
        showError(res.data.error);
      })
      .catch((error) => {
        showError(JSON.stringify(error));
      });
  };
  return (
    <Flex direction={"column"} gap={"3"} className="max-w-xl">
      {errorMsg && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{errorMsg}</Callout.Text>
        </Callout.Root>
      )}
      <Heading as="h2">{travelService.title}</Heading>
      <Flex justify={"between"}>
        <Box>
          <Text color="gray" size={"2"} as="p">
            起止日期：{travelService.travelStartDate}--
            {travelService.travelEndDate}
          </Text>
          <Text color="gray" size={"2"} as="p">
            服务承接：{travelService.travelAgency}
          </Text>
          <Text color="gray" size={"2"} as="p">
            疗休养地：{travelService.travelDestination}
          </Text>
        </Box>
        <Box>
          <ScoreBadge score={rateTotal} />
        </Box>
      </Flex>
      <Box
        style={{
          background: "var(--gray-a2)",
        }}
        p="4"
      >
        <Text>{travelService.description}</Text>
      </Box>
      {travelService.ratingTemplate.ratingItems.map((ratingItemsOnTemplate) => (
        <Card key={ratingItemsOnTemplate.id}>
          <Text size="3">
            {ratingItemsOnTemplate.ratingItem.title}
            <Separator my="3" size="4" />
            <RadioGroup.Root
              onValueChange={(value: string) => {
                const itemValue = value.split(",");
                const newRatingItemValues = [...ratingItemValues];
                const index = newRatingItemValues.findIndex(
                  (item) => item.ratingItemOnTemplate === parseInt(itemValue[0])
                );
                newRatingItemValues.splice(index, 1, {
                  ratingItemOnTemplate: parseInt(itemValue[0]),
                  valuesOnRatingItem: parseInt(itemValue[1]),
                  value: parseInt(itemValue[2]),
                });
                setRatingItemValues(newRatingItemValues);
              }}
            >
              {ratingItemsOnTemplate.ratingItem.ratingValues.map(
                (valuesOnRatingItem) => (
                  <Flex direction={"column"} key={valuesOnRatingItem.id}>
                    <Text as="label" my={"1"}>
                      <Flex gap="3">
                        <RadioGroup.Item
                          value={`${ratingItemsOnTemplate.id},${valuesOnRatingItem.id},${valuesOnRatingItem.ratingValue.value}`}
                        />
                        {valuesOnRatingItem.ratingValue.title}
                      </Flex>
                    </Text>
                  </Flex>
                )
              )}
            </RadioGroup.Root>
          </Text>
        </Card>
      ))}
      {travelService.ratingTemplate.remarkItems.map((remarkItemsOnTemplate) => (
        <Card key={remarkItemsOnTemplate.id}>
          <Text size={"3"}>{remarkItemsOnTemplate.remarkItem.title}</Text>
          <TextArea
            className="h-36 my-3"
            size={"3"}
            placeholder={remarkItemsOnTemplate.remarkItem.description}
            value={
              remarks.find(
                (remark) =>
                  remark.remarkItemOnTemplate === remarkItemsOnTemplate.id
              )?.remarkContent
            }
            onChange={(event) => {
              const newRemarks = [...remarks];
              const index = newRemarks.findIndex(
                (item) => item.remarkItemOnTemplate === remarkItemsOnTemplate.id
              );
              newRemarks.splice(index, 1, {
                remarkItemOnTemplate: remarkItemsOnTemplate.id,
                remarkItem: remarkItemsOnTemplate.remarkItemId,
                remarkContent: event.target.value,
              });
              setRemarks(newRemarks);
            }}
          />
        </Card>
      ))}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="solid" size={"3"} disabled={isSubmitting}>
            {"提交评分表"}
            {isSubmitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>评价疗休养</AlertDialog.Title>
          <AlertDialog.Description size="2">
            您的分数是评价旅行社的重要依据，请务必如实填写。评分操作是不可修改的，您确认提交吗?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                取消
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleRating}>
                确认
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  );

  function showError(msg: string) {
    setErrorMsg(msg);
    setSubmitting(false);
    router.push("#");
  }
};

export default RatingTravelServiceForm;
