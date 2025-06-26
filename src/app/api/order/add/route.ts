import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusherServer";

export async function POST(req: NextRequest) {
  const { username, tableId, orderData } = await req.json();
  try {
    const { user, historyEntry } = await tableServices.addOrderToUser(
      tableId,
      username,
      orderData
    );
    await pusherServer.trigger(`table-${tableId}`, "order-add", {
      user,
      username,
      historyEntry,
    });
    return Response.json(
      { message: "Order added to user successfully", user },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
