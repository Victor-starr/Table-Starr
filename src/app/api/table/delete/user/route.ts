import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { pusherServer } from "@/lib/pusherServer";

export async function DELETE(req: NextRequest) {
  const { requestingUsername, targetUsername, tableId } = await req.json();
  try {
    const { table, historyEntry } = await tableServices.deleteUserFromTable(
      requestingUsername,
      targetUsername,
      tableId
    );
    if (historyEntry) {
      await pusherServer.trigger(`table-${tableId}`, "table-user-deleted", {
        requestingUsername,
        targetUsername,
        historyEntry,
      });
    }
    return Response.json(
      { message: "User deleted successfully", table },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
