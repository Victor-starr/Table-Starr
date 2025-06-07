import tableServices from "@/services/tableServices";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, tableId } = await req.json();

  try {
    const userCheck = await tableServices.userCheck(username, tableId);
    return Response.json(
      { message: "User checked successfully", userCheck },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching username:", error);
    return Response.json(
      { error: "Failed to fetch username" },
      { status: 500 }
    );
  }
}
