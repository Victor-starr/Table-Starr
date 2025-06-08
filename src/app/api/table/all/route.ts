import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
export async function POST(req: NextRequest) {
  const { username, tableId } = await req.json();
  try {
    if (!tableId) {
      const tableList = await tableServices.allTables(username);
      return Response.json(
        { message: "All tables fetched successfully", tableList },
        { status: 200 }
      );
    } else {
      const currentTable = await tableServices.getCurrentTable(tableId);
      return Response.json(
        { message: "Current table fetched successfully", currentTable },
        { status: 200 }
      );
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
