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
  Flex,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import SelectedRatingUsers, { RatingUser } from "./SelectedRatingUsers";
import { formatToRatingUser } from "./formatToRatingUser";
import BatchInputButton from "./BatchInputButton";
import { findUser } from "@/app/actions";

interface Props {
  travelService?: TravelService;
}
const TravelServiceForm = ({ travelService }: Props) => {
  type TravelServiceForm = z.infer<typeof travelServiceSchema>;
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedRatingUsers, setSelectedRatingUsers] = useState<RatingUser[]>(
    travelService ? formatToRatingUser(travelService.ratingUsers) : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelServiceForm>({
    resolver: zodResolver(travelServiceSchema),
  });
  type nameEnum = keyof typeof travelServiceSchema.shape;
  const textFields: { name: nameEnum; label: string; placeholder?: string }[] =
    [
      { name: "title", label: "标题" },
      // { name: "description", label: "说明" },
      // { name: "ratingUsers", label: "评分用户" },
      { name: "travelAgency", label: "旅行社" },
      { name: "travelDestination", label: "目的地" },
      { name: "travelStartDate", label: "开始日期", placeholder: "YYYY-MM-DD" },
      { name: "travelEndDate", label: "结束日期", placeholder: "YYYY-MM-DD" },
      // { name: "createBy", label: "创建人" },
      // { name: "ratingTemplateId", label: "评分表模板" },
    ];

  const onSubmit = handleSubmit(async (data) => {
    if (selectedRatingUsers.length < 1) {
      //   console.log(selectedRatingUsers.length);
      showError("请添加疗休养人员");
      return;
    }
    const ratingUsers = selectedRatingUsers
      .map((user) => user.ygdm + "|" + user.ygmc)
      .join(",");

    if (!session || session.user?.role !== "ADMIN") {
      showError("未授权");
      return;
    }

    setSubmitting(true);
    let submitData: FieldValues = {
      ...data,
      ratingUsers: ratingUsers,
      ratingTemplateId: 1,
    };
    if (!travelService) {
      submitData = {
        ...submitData,
        createBy: session.user!.ygdm + "|" + session.user!.ygmc,
      };
    }

    try {
      if (travelService)
        await axios.patch(
          "/api/travelServices/" + travelService.id,
          submitData
        );
      else await axios.post("/api/travelServices/", submitData);
      router.push("/travelServices");
      router.refresh();
    } catch (error: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        showError(JSON.stringify(error.message));
      } else showError("发生了未知错误！");
    }
  });

  return (
    <div className="max-w-xl">
      {errorMsg && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{errorMsg}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-8 pb-8" onSubmit={onSubmit}>
        <Flex direction={"column"} gap={"3"}>
          <Heading size={"5"} className="pb-5">
            疗休养信息
          </Heading>

          {textFields.map((field) => (
            <div key={field.label}>
              <TextField.Root size={"3"} radius="large">
                <TextField.Slot>{field.label}</TextField.Slot>
                <TextField.Input
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  defaultValue={travelService?.[field.name] || undefined}
                />
              </TextField.Root>
              <ErrorMessage>{errors[field.name]?.message}</ErrorMessage>
            </div>
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

          <Flex justify={"between"} mr={"2"} align={"baseline"}>
            <Heading size={"3"} color="gray" className="pt-3 px-3">
              疗休养人员名单
            </Heading>
            <BatchInputButton onBatchUsersInput={handleUsersInput} />
          </Flex>

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
          {travelService ? "修改疗休养" : "添加疗休养"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );

  function showError(msg: string) {
    setErrorMsg(msg);
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

  async function handleUsersInput(users: string) {
    // 分割成数组
    // 对每一个元素
    //   如果尚不存在，就检查是否是正式职工，如果是，设置员工代码和员工姓名。
    // 添加到selectedRatingUsers.
    let batchInputUsers: RatingUser[] = [];
    await Promise.all(
      users.split(",").map(async (user) => {
        if (
          selectedRatingUsers.filter((existUser) => existUser.ygdm === user)
            .length === 0
        ) {
          const employee = await findUser(user);
          if (employee)
            batchInputUsers.push({ ygdm: employee.ygdm, ygmc: employee.ygmc });
        }
      })
    );
    // console.log(batchInputUsers);
    setSelectedRatingUsers([...selectedRatingUsers, ...batchInputUsers]);
  }
};

export default TravelServiceForm;
