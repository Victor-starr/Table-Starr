import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusherServer";

export async function DELETE(req: NextRequest) {
  const { username, tableId, orderId } = await req.json();
  try {
    const { user, historyEntry } = await tableServices.deleteOrderFromUser(
      username,
      tableId,
      orderId
    );

    if (historyEntry) {
      await pusherServer.trigger(
        `table-${tableId}`,
        "table-user-order-deleted",
        {
          user,
          username,
          historyEntry,
        }
      );
    }

    return Response.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
