import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, tableId, orderData } = await req.json();

  try {
    const order = await tableServices.createOrder(username, tableId, orderData);
    return Response.json(
      { message: "Order created successfully", order },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
