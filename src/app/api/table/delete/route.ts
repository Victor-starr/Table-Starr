import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";

export async function DELETE(req: NextRequest) {
  const { tableId } = await req.json();
  try {
    const tableList = await tableServices.deleteTable(tableId);
    return Response.json(
      { message: "Table deleted successfully", tableList },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
