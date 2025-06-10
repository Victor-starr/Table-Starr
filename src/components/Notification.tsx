"use client";
import { NotificationContext } from "@/context/NotificationContext";
import { Bubble } from "pixel-retroui";
import { useContext } from "react";

const Notification = () => {
  const { notifications } = useContext(NotificationContext);

  if (!notifications || notifications.length === 0) return null;

  const getBubbleStyle = (status: number) => {
    switch (status) {
      case 200:
        return {
          bg: "#d4edda",
          textColor: "#155724",
          borderColor: "#c3e6cb",
          emoji: "✅",
        };
      case 201:
        return {
          bg: "#d4edda",
          textColor: "#155724",
          borderColor: "#c3e6cb",
          emoji: "🎉",
        };
      case 500:
        return {
          bg: "#fff3cd",
          textColor: "#856404",
          borderColor: "#ffeeba",
          emoji: "❌",
        };
      default:
        return {
          bg: "#e2e3e5",
          textColor: "#000000",
          borderColor: "#000000",
          emoji: "ℹ️",
        };
    }
  };

  return (
    <div className="top-20 right-5 z-101 fixed flex flex-col items-end gap-1">
      {notifications.map((n) => {
        const { bg, textColor, borderColor, emoji } = getBubbleStyle(n.status);
        return (
          <Bubble
            key={n.id}
            direction="right"
            bg={bg}
            textColor={textColor}
            borderColor={borderColor}
            className="text-sm lg:text-3xl animate-fade-in"
          >
            {emoji + " " + n.message}
          </Bubble>
        );
      })}
    </div>
  );
};

export default Notification;
