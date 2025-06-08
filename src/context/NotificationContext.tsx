"use client";
import { createContext } from "react";
import { NotificationType } from "@/lib/types";
interface NotificationContextType {
  message: string;
  status: number;
  showNotification: (response: NotificationType) => void;
}

const DefaultNotificationContext: NotificationContextType = {
  message: "",
  status: 0,
  showNotification: () => {},
};
export const NotificationContext = createContext<NotificationContextType>(
  DefaultNotificationContext
);
