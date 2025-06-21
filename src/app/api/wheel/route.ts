import tableServices from "@/services/tableServices";
import { getErrorMessage } from "@/utils/errorHandler";
import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusherServer";

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
        responseMessage = `Challenge accepted => ${challange.message} 🎉`;
        break;
      case false:
        responseMessage = `Challenge declined=> ${challange.message} ❌`;
        break;
    }
    await pusherServer.trigger(`table-${tableId}`, "wheel-spinned", {});
    return Response.json(
      { message: responseMessage, tableData },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return Response.json({ error: errorMessage }, { status: 201 });
  }
}
