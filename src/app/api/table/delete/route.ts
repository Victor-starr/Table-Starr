import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";

export async function DELETE(req: NextRequest) {
  const { tableId } = await req.json();
  try {
    const tableList = await tableServices.deleteTable(tableId);
    return Response.json(
      { message: "Table deleted successfully", tableList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting table:", error);
    return Response.json({ error: "Failed to delete table" }, { status: 500 });
  }
}
