"use client";
import { useState, useRef } from "react";
import { NotificationContext } from "./NotificationContext";
import { NotificationType } from "@/lib/types";
import extractNotificationData from "@/utils/extractNotificationData";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<
    { message: string; status: number; id: number }[]
  >([]);
  const idRef = useRef(0);

  const showNotification = (response: NotificationType) => {
    const result = extractNotificationData(response);
    if (!result) return;

    const { message, status } = result;
    const id = idRef.current++;
    setNotifications((prev) => [...prev, { message, status, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
