import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { pusherServer } from "@/lib/pusherServer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, tableId, orderData } = await req.json();

  try {
    const { order, historyEntry } = await tableServices.createOrder(
      username,
      tableId,
      orderData
    );
    await pusherServer.trigger(`table-${tableId}`, "order-created", {
      order,
      historyEntry,
    });
    return Response.json(
      { message: "Order created successfully", order },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
