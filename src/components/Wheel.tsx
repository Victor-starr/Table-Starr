import { Button } from "pixel-retroui";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
const data = [
  {
    option: "PAY 5$ to the person on your left",
  },
  {
    option: "The person on across you owns you 12$",
  },
  {
    option: "You Own 2$ to each person for the bill ",
  },
  {
    option: "You Own 5$ to the person on your right",
  },
  {
    option: "The person on your left owns you 3$",
  },
  {
    option: "You Own 10$ to the person across you",
  },
  {
    option: "You Own 7$ to the person on your right",
  },
  {
    option: "You Own 4$ to the person on your left",
  },
  {
    option: "The person on your right owns you 8$",
  },
  {
    option: "You Own 6$ to the person across you",
  },
  {
    option: "The person on your left owns you 9$",
  },
  {
    option: "You Own 11$ to the person on your right",
  },
  {
    option: "The person across you owns you 15$",
  },
  {
    option: "You Own 20$ to the person on your left",
  },
  {
    option: "The person on your right owns you 25$",
  },
];
const WheelSection = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winMsg, setWinMsg] = useState("");

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        onStopSpinning={() => {
          setMustSpin(false);
          setWinMsg("You won: " + data[prizeNumber].option);
        }}
        data={data.map((item) =>
          item.option.length > 20
            ? { option: item.option.slice(0, 20) + "..." }
            : item
        )}
        prizeNumber={prizeNumber}
        fontSize={12}
        backgroundColors={[
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A1",
          "#FF8C33",
          "#33FFF5",
          "#F533FF",
          "#FF3333",
          "#33FF8C",
        ]}
        textColors={["#ffffff"]}
        fontWeight={"bold"}
        fontStyle="normal"
        textDistance={60}
        innerRadius={10}
        outerBorderWidth={5}
        innerBorderWidth={2}
        radiusLineWidth={2}
        perpendicularText={false}
      />
      <p>{winMsg}</p>
      <Button onClick={handleSpinClick}>SPIN</Button>
    </>
  );
};

export default WheelSection;
