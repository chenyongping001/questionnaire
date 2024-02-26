import { NextRequest, NextResponse } from "next/server";
import fetchEmployees from "./fetchEmployees";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim();
  if (!search) return NextResponse.json([], { status: 200 });
  try {
    const employees = await fetchEmployees(search);
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "服务器错误" }, { status: 400 });
  }
}
