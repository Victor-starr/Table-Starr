import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { tableId, username, challange } = await req.json();

  try {
    const tableData = await tableServices.acceptedChallange(
      tableId,
      username,
      challange
    );
    let responseMessage = "";

    switch (challange.status) {
      case true:
        responseMessage = `User ${username} accepted the challenge: ${challange.message} 🎉`;
        break;
      case false:
        responseMessage = `User ${username} declined the challenge: ${challange.message} ❌`;
        break;
    }
    return Response.json(
      { message: responseMessage, tableData },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 201 });
  }
}
