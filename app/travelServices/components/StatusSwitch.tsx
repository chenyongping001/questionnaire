"use client";
import { Flex, Switch, Text } from "@radix-ui/themes";
import React from "react";

const StatusSwitch = () => {
  return (
    <Text as="label" size="3" my="3">
      <Flex gap="2">
        <Switch radius="small" size={"3"} onCheckedChange={() => {}} /> 开启评价
      </Flex>
    </Text>
  );
};

export default StatusSwitch;
