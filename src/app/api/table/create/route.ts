import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";

export async function POST(req: NextRequest) {
  const tableData = await req.json();
  try {
    const newTable = await tableServices.createTable(tableData);
    return Response.json(
      { message: "Table created successfully", newTable },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
