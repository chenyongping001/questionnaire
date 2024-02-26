"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { travelServiceSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TravelService } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Heading,
  Tabs,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import SelectedRatingUsers, { RatingUser } from "./SelectedRatingUsers";

interface Props {
  travelService?: TravelService;
}
const TravelServiceForm = ({ travelService }: Props) => {
  type TravelServiceForm = z.infer<typeof travelServiceSchema>;
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedRatingUsers, setSelectedRatingUsers] = useState<RatingUser[]>(
    []
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TravelServiceForm>({
    resolver: zodResolver(travelServiceSchema),
  });
  type nameEnum = keyof typeof travelServiceSchema.shape;
  const textFields: { name: nameEnum; label: string }[] = [
    { name: "title", label: "标题" },
    // { name: "description", label: "说明" },
    // { name: "ratingUsers", label: "评分用户" },
    { name: "travelAgency", label: "旅行社" },
    { name: "travelDestination", label: "目的地" },
    // { name: "createBy", label: "创建人" },
    // { name: "ratingTemplateId", label: "评分表模板" },
  ];
  const dateFields: { name: nameEnum; label: string }[] = [
    { name: "travelStartDate", label: "开始日期" },
    { name: "travelEndDate", label: "结束日期" },
  ];
  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    let submitData: FieldValues = {
      ...data,
    };

    try {
      if (travelService)
        await axios.patch(
          "/api/travelServices/" + travelService.id,
          submitData
        );
      else await axios.post("/api/travelServices/", submitData);
      router.push("/travelServiceRatings");
      router.refresh();
    } catch (error: AxiosError | any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        showError(JSON.stringify(error.response?.data));
      } else showError("发生了未知错误！");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-8 pb-8" onSubmit={onSubmit}>
        <Flex direction={"column"} gap={"3"}>
          <Heading size={"5"} className="pb-5">
            疗休养服务综合评分表
          </Heading>

          {textFields.map((field) => (
            <div key={field.label}>
              <TextField.Root size={"3"} radius="large">
                <TextField.Slot>{field.label}</TextField.Slot>
                <TextField.Input
                  {...register(field.name)}
                  defaultValue={travelService?.[field.name] || undefined}
                />
              </TextField.Root>
              <ErrorMessage>{errors[field.name]?.message}</ErrorMessage>
            </div>
          ))}
          {dateFields.map((field) => (
            <Grid columns={"3"} key={field.label} gap={"3"}>
              <Card>
                {/* <TextField.Root size={"3"} radius="large">
                  <TextField.Slot>{field.label}</TextField.Slot>
                </TextField.Root> */}
                <Text size={"3"} color="gray">
                  {field.label}
                </Text>
              </Card>

              <TextField.Root size={"3"} radius="large" className="col-span-2">
                <TextField.Input
                  type="date"
                  {...register(field.name)}
                  defaultValue={travelService?.[field.name] || undefined}
                />
              </TextField.Root>
            </Grid>
          ))}
          <TextArea
            style={{ height: 120 }}
            size={"3"}
            placeholder="说明"
            {...register("description")}
            defaultValue={
              travelService?.description ||
              "本表作为评价旅行社的重要依据，如当团评分平均分低于80分，则该疗休养线路将委托另一家旅行社承接，请您如实填写。"
            }
          />

          <Heading size={"3"} color="gray" className="pt-3 px-3">
            疗休养人员名单
          </Heading>

          <Box pt="1">
            <SelectedRatingUsers
              selectedRatingUsers={selectedRatingUsers}
              onSelectedUser={handleSelectedUser}
              onUnselectUser={handleUnselectUser}
            />
          </Box>
        </Flex>
        <Button
          variant="solid"
          size={"3"}
          //   type="submit"
          disabled={isSubmitting}
        >
          {travelService ? "更新疗休养评分表" : "生成疗休养评分表"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );

  function showError(msg: string) {
    setError(msg);
    setSubmitting(false);
    router.push("#");
  }

  function handleSelectedUser(user: RatingUser) {
    selectedRatingUsers.filter((existUser) => existUser.ygdm === user.ygdm)
      .length === 0 && setSelectedRatingUsers([...selectedRatingUsers, user]);
  }

  function handleUnselectUser(unselectedUser: RatingUser) {
    setSelectedRatingUsers(
      selectedRatingUsers.filter((user) => user.ygdm !== unselectedUser.ygdm)
    );
  }
};

export default TravelServiceForm;
