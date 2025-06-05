import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";

export async function POST(req: NextRequest) {
  const { username, tableId } = await req.json();
  try {
    if (!tableId) {
      const tableList = await tableServices.allTables(username);
      return Response.json(
        { message: "Tables fetched successfully", tableList },
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
    console.error("Error creating table:", error);
    return Response.json({ error: "Failed to create table" }, { status: 500 });
  }
}

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
