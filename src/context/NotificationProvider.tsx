"use client";
import { useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { NotificationType } from "@/lib/types";
const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const showNotification = (response: NotificationType) => {
    setMessage("");
    setStatus(0);

    if ("data" in response && response.data && "message" in response.data) {
      setMessage(response.data.message);
      setStatus(response.status);
    } else if (
      "data" in response &&
      response.data &&
      "error" in response.data
    ) {
      setMessage(response.data.error);
      setStatus(response.status);
    } else if ("message" in response) {
      setMessage(response.message);
      setStatus(response.status);
    } else if ("error" in response) {
      setMessage(String(response.error));
      setStatus(response.status);
    }

    setTimeout(() => {
      setMessage("");
      setStatus(0);
    }, 4000);
  };
  return (
    <NotificationContext.Provider value={{ message, status, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
