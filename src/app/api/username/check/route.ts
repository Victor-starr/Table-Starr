import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
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
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
