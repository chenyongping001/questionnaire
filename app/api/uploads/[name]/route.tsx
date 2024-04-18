import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
interface Props {
  params: {
    name: string;
  };
}

export async function GET(res: NextRequest, { params }: Props) {
  const { UPLOAD_DIR: uploadDir } = process.env;
  const serverFilepath = path.join(
    process.cwd(),
    `${uploadDir}/${params.name}`
  );
  try {
    const data = await fs.readFileSync(serverFilepath);
    return new NextResponse(data);
  } catch (error) {
    notFound();
  }
}
