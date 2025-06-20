import { useState } from "react";

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
  };

  // TODO: Handle the acceptance logic
  const onAccept = () => {
    setWheelPopup(false);
    setMustSpin(false);
    setWinMsg("");
    alert("You accepted the prize!");
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setWinMsg(userWinner + ": " + data[prizeNumber].option);
    setWheelPopup(true);
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
  };
}
