import { type NextRequest } from "next/server";
import tableServices from "@/services/tableServices";

export async function POST(req: NextRequest) {
  const tableData = await req.json();
  try {
    const tableList = await tableServices.createTable(tableData);
    return Response.json(
      { message: "Table created successfully", tableList },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating table:", error);
    return Response.json({ error: "Failed to create table" }, { status: 500 });
  }
}
