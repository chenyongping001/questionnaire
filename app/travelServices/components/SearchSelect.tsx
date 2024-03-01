import { Flex, Select, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export interface SelectItem {
  value: string;
  label: string;
}

interface Props {
  endpoint: string;
  searchPlaceHolder: string;
  size: "1" | "2" | "3";
  minChar: number;
  onItemSelect: (item?: SelectItem) => void;
}

const SearchSelect = ({
  endpoint,
  searchPlaceHolder,
  size,
  minChar,
  onItemSelect,
}: Props) => {
  const [entering, setEntering] = useState(true);
  const [search, setSearch] = useState("");

  const {
    data: filteredItems = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["employees", search],
    queryFn: () =>
      axios
        .get<SelectItem[]>(`${endpoint}/?search=${search}`)
        .then((res) => res.data),
  });
  if (error) return;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Flex direction={"column"}>
      {entering && (
        <TextField.Root size={size}>
          <TextField.Slot>
            <FiSearch />
          </TextField.Slot>
          <TextField.Input
            placeholder={searchPlaceHolder}
            onChange={(event) => {
              const reg = /[\u4e00-\u9fa5]/g;
              const matchs = event.target.value.match(reg);
              const search = matchs?.join("") || "";
              if (search.length >= minChar) {
                setSearch(search);
                setEntering(false);
              }
            }}
          ></TextField.Input>
        </TextField.Root>
      )}

      {!entering && (
        <Select.Root
          defaultOpen
          onValueChange={(value) => {
            if (value === "reset") {
              setEntering(true);
              setSearch("");
              onItemSelect();
              return;
            }
            onItemSelect(filteredItems.find((item) => item.value === value));
          }}
          size={size}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="reset">重新搜索</Select.Item>
            <Select.Separator />
            {filteredItems?.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    </Flex>
  );
};

export default SearchSelect;
