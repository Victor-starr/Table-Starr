"use client";
import { NotificationContext } from "@/context/NotificationContext";
import { Bubble } from "pixel-retroui";
import { useContext, useEffect, useState } from "react";

const Notification = () => {
  const { message, status } = useContext(NotificationContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message && status) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4000); // Hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message, status]);

  if (!message || !status) return null;
  let bubbleStyle = {};
  let emojiStatus = "";

  switch (status) {
    case 200:
      bubbleStyle = {
        bg: "#d4edda",
        textColor: "#155724",
        borderColor: "#c3e6cb",
      };
      emojiStatus = "✅";
      break;
    case 201:
      bubbleStyle = {
        bg: "#d4edda",
        textColor: "#155724",
        borderColor: "#c3e6cb",
      };
      emojiStatus = "🎉";
      break;
    case 500:
      bubbleStyle = {
        bg: "#fff3cd",
        textColor: "#856404",
        borderColor: "#ffeeba",
      };
      emojiStatus = "❌";
      break;
    default:
      bubbleStyle = {
        bg: "#ffffff",
        textColor: "#000000",
        borderColor: "#000000",
      };
      emojiStatus = "ℹ️";
      break;
  }

  return (
    <Bubble
      direction="right"
      {...bubbleStyle}
      className={`top-22 right-5 z-101 absolute ${
        isVisible ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      {emojiStatus + " " + message}
    </Bubble>
  );
};

export default Notification;
