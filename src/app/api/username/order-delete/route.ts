import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusherServer";

export async function DELETE(req: NextRequest) {
  const { username, tableId, orderId } = await req.json();
  try {
    await tableServices.deleteOrderFromUser(username, tableId, orderId);
    await pusherServer.trigger(
      `table-${tableId}`,
      "table-user-order-deleted",
      {}
    );
    return Response.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
