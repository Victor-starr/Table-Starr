import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusherServer";

export async function POST(req: NextRequest) {
  const { username, tableId } = await req.json();
  try {
    const table = await tableServices.userCheck(username, tableId);
    await pusherServer.trigger(`table-${tableId}`, "joined-user", {
      table,
    });
    return Response.json(
      { message: "User checked successfully", table },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 201 });
  }
}
