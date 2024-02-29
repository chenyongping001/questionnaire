import { travelServiceSchema } from "@/app/validationSchemas";
import { TravelService } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

export type travelServiceField = {
  name: keyof typeof travelServiceSchema.shape;
  label: string;
  needSub?: Boolean;
  start?: number;
  end?: number;
};

interface Props {
  travelService: TravelService;
  travelServiceFields: travelServiceField[];
}

const ShowTravelServiceFields = ({
  travelService,
  travelServiceFields,
}: Props) => {
  return (
    <>
      {travelServiceFields.map((field) => (
        <Card key={field.name} variant="surface">
          <Flex gap="3" align="center">
            <Text size={"2"} color="gray">
              {field.label}
            </Text>
            <Text>
              {field.needSub
                ? travelService[field.name].substring(field.start!, field.end)
                : travelService[field.name]}
            </Text>
          </Flex>
        </Card>
      ))}
    </>
  );
};

export default ShowTravelServiceFields;
