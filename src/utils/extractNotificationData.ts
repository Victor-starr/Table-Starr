import { NotificationType } from "@/lib/types";

function extractNotificationData(
  response: NotificationType
): { message: string; status: number } | null {
  const status = response.status;

  if ("data" in response) {
    if ("message" in response.data) {
      return { message: response.data.message, status };
    } else if ("error" in response.data) {
      return { message: response.data.error, status };
    }
  }

  if ("message" in response) {
    return { message: response.message, status };
  }

  if ("error" in response) {
    return { message: String(response.error), status };
  }

  return null;
}
export default extractNotificationData;
