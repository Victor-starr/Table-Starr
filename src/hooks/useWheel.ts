import { useContext, useState } from "react";
import { useUserExp } from "./useUserExp";
import { NotificationContext } from "@/context/NotificationContext";
import { ServerErrorMessage } from "@/lib/types";
import axios from "axios";

const data = [
  { option: "PAY 5$ to the person on your left" },
  { option: "The person on across you owns you 12$" },
  { option: "You Own 2$ to each person for the bill " },
  { option: "You Own 5$ to the person on your right" },
  { option: "The person on your left owns you 3$" },
  { option: "You Own 10$ to the person across you" },
  { option: "You Own 7$ to the person on your right" },
  { option: "You Own 4$ to the person on your left" },
  { option: "The person on your right owns you 8$" },
  { option: "You Own 6$ to the person across you" },
  { option: "The person on your left owns you 9$" },
  { option: "You Own 11$ to the person on your right" },
  { option: "The person across you owns you 15$" },
  { option: "You Own 20$ to the person on your left" },
  { option: "The person on your right owns you 25$" },
];

export function useWheel(userWinner: string) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winMsg, setWinMsg] = useState("");
  const [wheelPopUp, setWheelPopup] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const { startLoading, stopLoading, setErrorMessage, loading, error } =
    useUserExp();

  const handleSpinClick = () => {
    if (!mustSpin && userWinner && userWinner.trim() !== "") {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const onDeny = () => {
    setWheelPopup(false);
    setMustSpin(false);
    setWinMsg("");
    const tableId = localStorage.getItem("tableId");
    if (!tableId) {
      setErrorMessage("Table ID not found in localStorage.");
      showNotification({
        status: 400,
        message: "Table ID not found in localStorage.",
      });
      return;
    } else {
      wheelChallange(userWinner, tableId, {
        status: false,
        message: winMsg,
      });
    }
  };

  const onAccept = () => {
    setWheelPopup(false);
    setMustSpin(false);
    setWinMsg("");
    const tableId = localStorage.getItem("tableId");
    if (!tableId) {
      setErrorMessage("Table ID not found in localStorage.");
      showNotification({
        status: 400,
        message: "Table ID not found in localStorage.",
      });
      return;
    } else {
      wheelChallange(userWinner, tableId, {
        status: true,
        message: winMsg,
      });
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setWinMsg(
      userWinner.charAt(0).toUpperCase() +
        userWinner.slice(1) +
        ": " +
        data[prizeNumber].option
    );
    setWheelPopup(true);
  };

  const wheelChallange = async (
    username: string,
    tableId: string,
    challange: { status: boolean; message: string }
  ) => {
    try {
      startLoading();
      const res = await axios.post("/api/wheel", {
        username,
        tableId,
        challange,
      });
      showNotification(res);
    } catch (err) {
      setErrorMessage((err as ServerErrorMessage).data.error);
      showNotification(err as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  return {
    data,
    mustSpin,
    prizeNumber,
    winMsg,
    wheelPopUp,
    handleSpinClick,
    onDeny,
    onAccept,
    onStopSpinning,
    wheelChallange,
    loading,
    error,
  };
}
