import tableServices from "@/services/tableServices";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, tableId, orderData } = await req.json();
  try {
    const order = await tableServices.addOrderToUser(
      tableId,
      username,
      orderData
    );
    return Response.json(
      { message: "Order added to user successfully", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding order to user:", error);
    return Response.json(
      { error: "Failed to add order to user" },
      { status: 500 }
    );
  }
}
