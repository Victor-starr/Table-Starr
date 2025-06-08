"use client";
import { createContext } from "react";
import { NotificationType } from "@/lib/types";
interface NotificationItem {
  message: string;
  status: number;
  id: number;
}
interface NotificationContextType {
  notifications: NotificationItem[];
  showNotification: (response: NotificationType) => void;
}

const DefaultNotificationContext: NotificationContextType = {
  notifications: [],
  showNotification: () => {},
};
export const NotificationContext = createContext<NotificationContextType>(
  DefaultNotificationContext
);
