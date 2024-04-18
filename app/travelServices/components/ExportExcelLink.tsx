"use client";
import { Header, saveToExcel } from "@/app/actions";
import { Link } from "@radix-ui/themes";

interface Props {
  headers: Header[];
  rows: unknown[];
}

const ExportExcelLink = ({ headers, rows }: Props) => {
  return (
    <Link
      size={"2"}
      mr={"2"}
      onClick={async () => {
        await saveToExcel(headers, rows);
      }}
    >
      导出
    </Link>
  );
};

export default ExportExcelLink;
