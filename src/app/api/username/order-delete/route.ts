import tableServices from "@/services/tableServices";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const { username, tableId, orderId } = await req.json();
  try {
    await tableServices.deleteOrderFromUser(username, tableId, orderId);
    return Response.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return Response.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
